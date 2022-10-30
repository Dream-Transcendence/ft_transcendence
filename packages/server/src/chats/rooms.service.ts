import {
  Inject,
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Equal, Repository, In, Not } from 'typeorm';
import { ChannelParticipant, Message, Room } from '../chats/rooms.entity';
import {
  CreateChannelDto,
  PatchUserInfoDto,
  PatchChannelInfoDto,
  CreateDmDto,
  ChannelParticipantDto,
  ChannelDto,
  EnterChannelDto,
  LeaveChannelDto,
  SendMessageDto,
  ChannelInfoDto,
  MessageDto,
  GetRoomInfoDto,
  DmDto,
  GetMessageDto,
} from './dto/rooms.dto';
import { Block, User } from '../users/users.entity';
import { DmParticipant } from './rooms.entity';
import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { WsException } from '@nestjs/websockets';
import * as AWS from 'aws-sdk';
import * as bcrypt from 'bcryptjs';
import { AuthorizationError } from 'passport-oauth2';

@Injectable()
export class RoomService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>,
    @Inject('ROOMS_REPOSITORY')
    private roomsRepository: Repository<Room>,
    @Inject('CHANNELPARTICIPANTS_REPOSITORY')
    private channelParticipantsRepository: Repository<ChannelParticipant>,
    @Inject('DMPARTICIPANTS_REPOSITORY')
    private dmParticipantsRepository: Repository<DmParticipant>,
    @Inject('BLOCKS_REPOSITORY')
    private blocksRepository: Repository<Block>,
    @Inject('MESSAGES_REPOSITORY')
    private messagesRepository: Repository<Message>,
  ) {}

  s3 = new AWS.S3();

  // ANCHOR Room Service
  async createChannel(createChannelDto: CreateChannelDto): Promise<ChannelDto> {
    const { userId, name, type, salt, participantIds } = createChannelDto;
    // NOTE room info 저장
    let roomRowId = 1;
    const maxRoomId = await this.roomsRepository
      .createQueryBuilder('room')
      .select('MAX(room.id)', 'id')
      .getRawOne();
    if (maxRoomId != null) roomRowId = maxRoomId.id + 1;

    const genSalt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(salt, genSalt);

    let room = this.roomsRepository.create({
      id: roomRowId,
      name,
      type,
      salt: hashedPassword,
      title: uuidv4(),
    });
    room = await this.roomsRepository.save(room);
    // Channel participants 저장
    let index = 1;
    let participantRowId = 1;
    const maxParticipantId = await this.channelParticipantsRepository
      .createQueryBuilder('channelParticipant')
      .select('MAX(channelParticipant.id)', 'id')
      .getRawOne();
    if (maxParticipantId != null) participantRowId = maxParticipantId.id + 1;

    const participants: ChannelParticipant[] = [];
    const Ids = [userId, ...participantIds];
    const promises = Ids.map(async (id) => {
      const participant: ChannelParticipant =
        this.channelParticipantsRepository.create({
          id: participantRowId + index++,
        });
      participant.user = await this.usersRepository.findOneBy({ id });
      participant.room = room;
      if (!participant.user) {
        await this.roomsRepository.delete({ id: room.id });
        throw new NotFoundException(`Can't find participant ${id}`);
      }
      participants.push(participant);
    });
    await Promise.all(promises);
    await this.channelParticipantsRepository.save(participants);
    // channel owner로 auth 변경
    participants[0].auth = 0;
    await this.channelParticipantsRepository.save(participants[0]);
    delete room.salt;
    return room;
  }

  async getChannels(userId: number): Promise<ChannelInfoDto[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!user)
      throw new NotFoundException(`유저(${userId})를 찾을 수 없습니다.`);
    const roomType = [1, 2];
    const channelLists = await this.roomsRepository.find({
      where: { type: In(roomType) },
    });
    // 1,2인 채널
    const userChannels = await this.channelParticipantsRepository.find({
      relations: { room: true },
      where: { user: { id: userId } },
    });
    // user가 들어간 채널
    const userChannelIds = [];
    userChannels.map((channel) => {
      userChannelIds.push(channel.room.id);
    });
    // 유저가 들어간 채널 id
    const channels = channelLists.filter(
      (channel) => userChannelIds.indexOf(channel.id) === -1,
    );
    channels.map((channel) => {
      delete channel.salt;
    });
    // 유저가 들어가지 않은 채널 1,2
    const results: ChannelInfoDto[] = [];
    const promises = channels.map(async (channel) => {
      const personnel = await this.channelParticipantsRepository.count({
        where: { room: { id: channel.id } },
      });
      const result: ChannelInfoDto = {
        ...channel,
        personnel,
      };
      results.push(result);
    });
    await Promise.all(promises);
    results.sort(function (a, b) {
      return b.id - a.id;
    });
    return results;
  }

  async getRoomInfo(roomId: number, userId: number): Promise<GetRoomInfoDto> {
    const room = await this.roomsRepository.findOne({
      where: { id: roomId },
    });
    // room이 dm일 때
    if (room.type == 0) {
      const user = await this.dmParticipantsRepository.findOne({
        relations: ['user'],
        where: { room: { id: roomId }, user: { id: userId } },
      });
      if (!user)
        throw new NotFoundException(`채널(${roomId}) 참여자가 아닙니다.`);
      const participant = await this.dmParticipantsRepository.findOne({
        relations: { user: true },
        where: { room: { id: roomId }, user: { id: Not(userId) } },
      });
      const blocked = await this.blocksRepository.findOne({
        where: {
          user: { id: userId },
          blockedUser: { id: participant.user.id },
        },
      });
      const roomInfo = {
        id: room.id,
        userId: participant.user.id,
        name: participant.user.nickname,
        type: room.type,
        image: participant.user.image,
        title: room.title,
        blocked: blocked !== null ? true : false,
      };
      return roomInfo;
    }
    // channelInfo
    else {
      const user = await this.channelParticipantsRepository.findOne({
        where: { room: { id: roomId }, user: { id: userId } },
      });
      if (!user)
        throw new NotFoundException(`채널(${roomId}) 참여자가 아닙니다.`);
      const roomInfo = {
        id: room.id,
        name: room.name,
        type: room.type,
        image: room.image,
        title: room.title,
        auth: user.auth,
        status: user.status,
      };
      return roomInfo;
    }
  }

  async getChannelParticipants(
    userId: number,
    roomId: number,
  ): Promise<ChannelParticipantDto[]> {
    const user = await this.channelParticipantsRepository.findOne({
      relations: ['user'],
      where: { room: { id: roomId }, user: { id: userId } },
    });
    if (!user)
      throw new NotFoundException(`채널(${roomId}) 참여자가 아닙니다.`);
    const blockUsers = await this.blocksRepository.find({
      relations: { blockedUser: true },
      where: { user: { id: userId } },
    });
    const blockIds = blockUsers.map((user) => user.blockedUser.id);
    // NOTE user block list의 id들만 뽑아온다
    const blockedParticipants = await this.channelParticipantsRepository.find({
      relations: { user: true },
      where: { room: { id: Equal(roomId) }, user: { id: In(blockIds) } },
    });
    const blockedParticipantIds = blockedParticipants.map(
      (participant) => participant.user.id,
    );
    // room안에 user에게 block된 participant ids만 뽑아온다
    const channelParticipants = await this.channelParticipantsRepository.find({
      relations: { user: true },
      where: { room: { id: roomId } },
    });
    const results: ChannelParticipantDto[] = [];
    channelParticipants.map((participant) => {
      const blockedBool =
        blockedParticipantIds.filter((id) => participant.user.id === id)
          .length === 0
          ? false
          : true;
      //blockedParticipantIds에 id가 있으면 true, 없으면 false
      const result = new ChannelParticipantDto(
        participant.user,
        participant.auth,
        participant.status,
        // participant.statusStartDate,
        blockedBool,
      );
      results.push(result);
    });
    const users = results.filter((result) => result.user.id == userId);
    const participants = results.filter((result) => result.user.id != userId);
    return [users[0], ...participants];
  }

  async postChannelImage(roomId: number, file: Express.Multer.File) {
    const room = await this.roomsRepository.findOne({
      where: { id: roomId },
    });

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
    };

    try {
      const data = await this.s3.upload(params).promise();
      room.image = data.Location;
      await this.roomsRepository.save(room);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('이미지 업로드를 실패했습니다.');
    }

    const channelDto = new ChannelDto(
      room.id,
      room.name,
      room.type,
      room.image,
      room.title,
    );
    return channelDto;
  }

  async patchChannelInfo(
    roomId: number,
    patchChannelInfoDto: PatchChannelInfoDto,
  ) {
    const { name, salt } = patchChannelInfoDto;
    const room = await this.roomsRepository.findOneBy({ id: roomId });
    if (name !== undefined) room.name = name;
    if (salt && salt !== '') {
      room.type = 2;
      const genSalt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(salt, genSalt);
      room.salt = hashedPassword;
    } else if (salt === '') {
      room.type = 1;
      room.salt = null;
    }
    await this.roomsRepository.save(room);
  }

  // ANCHOR Dm Service
  async createDm(createDmDto: CreateDmDto): Promise<DmDto> {
    const { userId, participantId } = createDmDto;

    const userDmRow = await this.dmParticipantsRepository.find({
      relations: { room: true },
      where: { user: { id: userId } },
    });
    const participantDmRow = await this.dmParticipantsRepository.find({
      relations: { room: true },
      where: { user: { id: participantId } },
    });
    const userDmIds = userDmRow.map((row) => row.room.id);
    const participantDmIds = participantDmRow.map((row) => row.room.id);
    const exist = userDmIds.filter((row) => participantDmIds.includes(row));
    if (exist.length) throw new ConflictException(`Dm channel already exists`);
    // NOTE dm info 저장
    let roomRowId = 1;
    const maxRoomId = await this.roomsRepository
      .createQueryBuilder('room')
      .select('MAX(room.id)', 'id')
      .getRawOne();
    if (maxRoomId != null) roomRowId = maxRoomId.id + 1;

    let dm = this.roomsRepository.create({
      id: roomRowId,
      type: 0,
      title: uuidv4(),
    });
    dm = await this.roomsRepository.save(dm);

    // dm participants 저장
    let index = 1;
    let participantRowId = 1;
    const maxParticipantId = await this.dmParticipantsRepository
      .createQueryBuilder('dmParticipant')
      .select('MAX(dmParticipant.id)', 'id')
      .getRawOne();
    if (maxParticipantId != null) participantRowId = maxParticipantId.id + 1;

    const participants: DmParticipant[] = [];
    const Ids = [participantId, userId];
    const promises = Ids.map(async (id) => {
      const participant: DmParticipant = this.dmParticipantsRepository.create({
        id: participantRowId + index++,
      });
      participant.user = await this.usersRepository.findOneBy({ id });
      participant.room = dm;
      if (!participant.user) {
        throw new NotFoundException(`Can't find participant ${id}`);
      }
      participants.push(participant);
    });
    await Promise.all(promises);
    this.dmParticipantsRepository.save(participants);
    const dmDto = {
      id: roomRowId,
      name: participants[0].user.nickname,
      image: participants[0].user.image,
    };
    return dmDto;
  }

  // Message service
  async getMessages(
    roomId: number,
    messageId: number,
    userId: number,
  ): Promise<GetMessageDto[]> {
    const room = await this.roomsRepository.findOneBy({ id: roomId });
    if (!room) throw new NotFoundException(`Can't find room ${roomId}`);
    if (room.type === 0) {
      const dmParticipant = await this.dmParticipantsRepository.findOne({
        relations: ['user', 'room'],
        where: { room: { id: roomId }, user: { id: userId } },
      });
      if (!dmParticipant)
        throw new UnauthorizedException('채팅방에 포함되지 않은 유저입니다.');
    } else {
      const channelParticipant =
        await this.channelParticipantsRepository.findOne({
          relations: ['user', 'room'],
          where: { room: { id: roomId }, user: { id: userId } },
        });
      if (!channelParticipant)
        throw new UnauthorizedException('채팅방에 포함되지 않은 유저입니다.');
    }
    const msgs = await this.messagesRepository.find({
      relations: { user: true },
      where: { room: { id: roomId } },
      order: { id: 'DESC' },
    });
    const result: GetMessageDto[] = [];
    let idx = 0;
    const msgResult = msgs.filter((msg) => {
      if (
        (!messageId && idx < 15) ||
        (messageId && messageId > msg.id && idx < 15)
      ) {
        idx++;
        return true;
      } else return false;
    });
    msgResult.sort(function (a, b) {
      return a.id - b.id;
    });
    msgResult.map((msg) => {
      const message = {
        user: {
          id: msg.user.id,
          nickname: msg.user.nickname,
          image: msg.user.image,
        },
        id: msg.id,
        body: msg.body,
      };
      result.push(message);
    });
    return result;
  }

  // ANCHOR Socket.io
  async enterChannel(client: Socket, enterChannelDto: EnterChannelDto) {
    const { userId, roomId, salt } = enterChannelDto;
    let participant: ChannelParticipant;
    const room = await this.roomsRepository.findOneBy({ id: roomId });
    if (!room) throw new WsException(`Cant't find room ${roomId}`);

    if (room.type != 0) {
      participant = await this.channelParticipantsRepository.findOne({
        relations: { user: true },
        where: { user: { id: userId }, room: { id: roomId } },
      });
      if (!participant) {
        if (room.type == 2 && !(await bcrypt.compare(salt, room.salt)))
          throw new WsException('Password is not correct');

        const maxId = await this.channelParticipantsRepository
          .createQueryBuilder('channelParticipant')
          .select('MAX(channelParticipant.id)', 'id')
          .getRawOne();
        let index = 1;
        if (maxId != null) index = maxId.id + 1;

        participant = this.channelParticipantsRepository.create({
          id: index,
          user: await this.usersRepository.findOneBy({ id: userId }),
          room,
        });
        await this.channelParticipantsRepository.insert(participant);
        client.to(room.title).emit('enterMessage', {
          user: {
            id: userId,
            nickname: participant.user.nickname,
            image: participant.user.image,
          },
        });
      }
    }
    // 유저 룸 초기화 후, roomId 룸에 추가
    client.rooms.clear();
    client.join(room.title);

    // 참여 성공
    // NOTE: 유저 입장 후, 채널 메세지와 참여자 목록 가져오는 API 추가(REST)
    return { isEntered: true };
  }

  async deleteChannelParticipant(
    client: Socket,
    leaveChannelDto: LeaveChannelDto,
  ) {
    const { roomId, userId } = leaveChannelDto;
    const deleteParticipant = await this.channelParticipantsRepository.findOne({
      relations: { room: true, user: true },
      where: { room: { id: roomId }, user: { id: userId } },
    });
    const title = deleteParticipant.room.title;
    await this.channelParticipantsRepository.delete({
      id: deleteParticipant.id,
    });
    client.leave(deleteParticipant.room.title);
    client.rooms.clear();

    if (deleteParticipant.auth === 0) {
      const owner = await this.channelParticipantsRepository.findOne({
        where: { room: { id: roomId } },
      });
      if (owner !== null) {
        owner.auth = 0;
        await this.channelParticipantsRepository.save(owner);
      } else {
        const msgs = await this.messagesRepository.findBy({
          room: { id: roomId },
        });
        const ids = msgs.map((msg) => msg.id);
        await this.messagesRepository.delete(ids);
        await this.roomsRepository.delete(roomId);
        return { isDeleted: true };
      }
    }
    client.to(title).emit('deleteMessage', `${deleteParticipant.user.id}`);
    return { isDeleted: true };
  }

  async sendMessage(client: Socket, sendMessageDto: SendMessageDto) {
    const { roomId, userId, body } = sendMessageDto;

    let rowId = 1;
    const maxId = await this.messagesRepository
      .createQueryBuilder('message')
      .select('MAX(message.id)', 'id')
      .getRawOne();
    if (maxId.id) rowId = maxId.id + 1;

    const msg = this.messagesRepository.create({
      id: rowId,
      date: new Date(),
      body,
      room: await this.roomsRepository.findOneBy({ id: roomId }),
      user: await this.usersRepository.findOneBy({ id: userId }),
    });

    await this.messagesRepository.save(msg);
    const userMessageDto: MessageDto = {
      user: {
        id: msg.user.id,
        nickname: msg.user.nickname,
        image: msg.user.image,
      },
      body: msg.body,
    };
    client.to(msg.room.title).emit('userMessage', userMessageDto);
    return { isSent: true };
  }

  async patchUserInfo(client: Socket, patchUserInfoDto: PatchUserInfoDto) {
    const { userId, roomId, auth, status } = patchUserInfoDto;
    const user = await this.channelParticipantsRepository.findOne({
      relations: { room: true, user: true },
      where: { room: { id: roomId }, user: { id: userId } },
    });
    let patchedColumn = '';
    let patchedValue = '';
    if (auth !== undefined) {
      user.auth = auth;
      patchedColumn = 'auth';
      switch (auth) {
        case null:
          patchedValue = 'User';
          break;
        case 0:
          patchedValue = 'Owner';
          break;
        case 1:
          patchedValue = 'Admin';
          break;
      }
    }
    if (status !== undefined) {
      user.status = status;
      user.statusStartDate = new Date();
      patchedColumn = 'status';
      switch (status) {
        case null:
          patchedValue = 'Normal';
          break;
        case 0:
          patchedValue = 'Mute';
          break;
        case 1:
          patchedValue = 'Ban';
          break;
      }
    }
    await this.channelParticipantsRepository.save(user);
    client.to(user.room.title).emit('patchMessage', {
      userId,
      auth,
      status,
      message: `참여자 ${user.user.nickname}의 ${patchedColumn}이(가) ${patchedValue}(으)로 변경되었습니다.`,
    });
  }
}
