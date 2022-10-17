import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
} from './dto/rooms.dto';
import { Block, User } from '../users/users.entity';
import { DmParticipant } from './rooms.entity';
import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { WsException } from '@nestjs/websockets';

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

    let room = this.roomsRepository.create({
      id: roomRowId,
      name,
      type,
      salt,
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
    const user = results.filter((result) => result.user.id == userId);
    const participants = results.filter((result) => result.user.id != userId);
    return [user[0], ...participants];
  }

  async patchChannelInfo(
    roomId: number,
    patchChannelInfoDto: PatchChannelInfoDto,
  ) {
    const { name, image, salt } = patchChannelInfoDto;
    const room = await this.roomsRepository.findOneBy({ id: roomId });
    if (name !== undefined) room.name = name;
    if (image !== undefined) room.image = image;
    if (salt && salt !== '') {
      room.type = 2;
      room.salt = salt;
    } else if (salt === '') {
      room.type = 1;
      room.salt = null;
    }
    await this.roomsRepository.save(room);
  }

  // ANCHOR Dm Service
  async createDm(createDmDto: CreateDmDto): Promise<void> {
    const { userId, participantId } = createDmDto;
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
  }

  // Message service
  async getMessages(roomId: number): Promise<MessageDto[]> {
    const msgs = await this.messagesRepository.find({
      relations: { user: true },
      where: { room: { id: roomId } },
      order: { id: 'ASC' },
    });
    const result: MessageDto[] = [];
    msgs.map((msg) => {
      const message = {
        user: {
          id: msg.user.id,
          nickname: msg.user.nickname,
          image: msg.user.image,
        },
        body: msg.body,
      };
      result.push(message);
    });
    return result;
  }

  // ANCHOR Socket.io
  async enterChannel(client: Socket, enterChannelDto: EnterChannelDto) {
    let user: User = null;
    const { userId, roomId, salt } = enterChannelDto;
    let participant: ChannelParticipant;
    const room = await this.roomsRepository.findOneBy({ id: roomId });
    if (!room) throw new WsException(`Cant't find room ${roomId}`);

    if (room.type != 0) {
      const row = await this.channelParticipantsRepository.findOne({
        where: { user: { id: userId }, room: { id: roomId } },
      });
      if (!row) {
        if (room.type == 2 && salt !== room.salt)
          throw new WsException('Password is not correct');
        participant = this.channelParticipantsRepository.create({
          user: await this.usersRepository.findOneBy({ id: userId }),
          room,
        });
        user = participant.user;
        await this.channelParticipantsRepository.insert(participant);
      }
    }
    // 유저 룸 초기화 후, roomId 룸에 추가
    client.rooms.clear();
    client.join(room.title);
    // 새 참여자라면, 입장 메세지 쏴주기
    if (user)
      client
        .to(room.title)
        .emit('roomMessage', `${user.nickname}이(가) 입장했습니다.`);

    // 참여 성공
    // NOTE: 유저 입장 후, 채널 메세지와 참여자 목록 가져오는 API 추가(REST)
    console.log('하... 어ㅔㅐㅗ 아노대니??');
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
    client
      .to(title)
      .emit(
        'roomMessage',
        `${deleteParticipant.user.nickname}이(가) 방을 나갔습니다.`,
      );
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
    client
      .to(user.room.title)
      .emit(
        'patchMessage',
        `참여자 ${user.user.nickname}의 ${patchedColumn}이(가) ${patchedValue}(으)로 변경되었습니다.`,
      );
  }
}
