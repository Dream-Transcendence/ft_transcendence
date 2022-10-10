import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Equal, Repository, In, Not } from 'typeorm';
import { ChannelParticipant, Room, Message } from '../chats/rooms.entity';
import {
  CreateChannelDto,
  PatchUserInfoDto,
  PatchChannelInfoDto,
  createDmDto,
  ChannelParticipantDto,
  ChannelDto,
  RoomPasswordDto,
  ChannelInfoDto,
  EnterChannelDto,
  LeaveChannelDto,
  SendMessageDto,
  MessageDto,
  GetMessagesDto,
} from './dto/rooms.dto';
import { Block, User } from '../users/users.entity';
import { UserDto } from '../users/dto/user.dto';
import { DmParticipant } from './rooms.entity';
import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

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
    let room = this.roomsRepository.create({
      name,
      type,
      salt,
      title: uuidv4(),
    });
    room = await this.roomsRepository.save(room);
    // Channel participants 저장
    const participants: ChannelParticipant[] = [];
    const Ids = [userId, ...participantIds];
    const promises = Ids.map(async (id) => {
      const participant: ChannelParticipant =
        this.channelParticipantsRepository.create();
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
    await this.patchUserInfo(room.id, userId, { auth: 0 });
    delete room.salt;
    return room;
  }

  async getChannels(userId: number): Promise<ChannelInfoDto[]> {
    const roomType = [1, 2];
    const channelLists = await this.roomsRepository.find({
      where: { type: In(roomType) },
    });
    // 1,2인 채널
    console.log('1,2인 채널: ', channelLists);
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

  async getChannelInfo(roomId: number, userId: number): Promise<ChannelDto> {
    const channel = await this.roomsRepository.findOne({
      where: { id: roomId },
    });
    const user = await this.channelParticipantsRepository.findOneBy({
      room: { id: roomId },
      user: { id: userId },
    });
    if (!user)
      throw new NotFoundException(
        `Cant't find room ${roomId} or participant ${userId}`,
      );
    if (user.auth != 0) {
      delete channel.type;
    }
    // NOTE 사용자가 owner라면 비밀번호를 설정할 수 있는 칸이 필요하기 때문에 owner일 때만 type을 준다
    // delete channel.id;
    delete channel.salt;
    return channel;
  }

  // async enterChannel(
  //   roomId: number,
  //   userId: number,
  //   roomPasswordDto: RoomPasswordDto,
  // ) {
  //   const { salt } = roomPasswordDto;
  //   let participant: ChannelParticipant;
  //   const check = await this.channelParticipantsRepository.count({
  //     where: { user: { id: userId }, room: { id: roomId } },
  //   });
  //   if (check)
  //     throw new BadRequestException(
  //       `user ${userId} is already in the room ${roomId}`,
  //     );
  //   const room = await this.roomsRepository.findOneBy({ id: roomId });
  //   if (!room) throw new NotFoundException(`Cant't find room ${roomId}`);
  //   if (room.type !== 2 || salt === room.salt || room.salt === '') {
  //     participant = this.channelParticipantsRepository.create();
  //     participant.user = await this.usersRepository.findOneBy({ id: userId });
  //     participant.room = await this.roomsRepository.findOneBy({ id: roomId });
  //     if (!participant.user)
  //       throw new NotFoundException(`Cant't find participant ${userId}`);
  //     this.channelParticipantsRepository.save(participant);
  //   } else throw new ForbiddenException('Password is not correct');
  // }

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

  // async deleteChannelParticipant(
  //   roomId: number,
  //   userId: number,
  // ): Promise<void> {
  //   const deleteParticipant = await this.channelParticipantsRepository.findOne({
  //     where: { room: { id: roomId }, user: { id: userId } },
  //   });
  //   if (deleteParticipant !== null) {
  //     await this.channelParticipantsRepository.delete({
  //       id: deleteParticipant.id,
  //     });
  //   } else {
  //     throw new NotFoundException(
  //       `Can't not delete user ${userId} in room ${roomId}`,
  //     );
  //   }
  //   if (deleteParticipant.auth === 0) {
  //     const owner = await this.channelParticipantsRepository.findOne({
  //       where: { room: { id: roomId } },
  //     });
  //     if (owner !== null) {
  //       owner.auth = 0;
  //       await this.channelParticipantsRepository.save(owner);
  //     } else {
  //       await this.roomsRepository.delete(roomId);
  //     }
  //   }
  // }

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

  async patchUserInfo(
    roomId: number,
    userId: number,
    patchUserInfoDto: PatchUserInfoDto,
  ): Promise<void> {
    const { auth, status } = patchUserInfoDto;
    const user = await this.channelParticipantsRepository.findOne({
      where: { room: { id: roomId }, user: { id: userId } },
    });
    if (auth !== undefined) user.auth = auth;
    if (status !== undefined) user.status = auth;
    await this.channelParticipantsRepository.save(user);
  }

  // ANCHOR Dm Service
  async createDm(createDmDto: createDmDto): Promise<void> {
    const { userId, participantId } = createDmDto;
    // NOTE dm info 저장
    let dm = this.roomsRepository.create({
      type: 0,
      title: uuidv4(),
    });
    dm = await this.roomsRepository.save(dm);
    // dm participants 저장
    const participants: DmParticipant[] = [];
    const Ids = [participantId, userId];
    const promises = Ids.map(async (id) => {
      const participant: DmParticipant = this.dmParticipantsRepository.create();
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

  async getDmParticipant(roomId: number, userId: number): Promise<UserDto> {
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
    const user = {
      id: participant.user.id,
      nickname: participant.user.nickname,
      image: participant.user.image,
      blocked: blocked !== null ? true : false,
    };
    return user;
  }

  // ANCHOR Socket.io
  async enterChannel(client: Socket, enterChannelDto: EnterChannelDto) {
    let user: User = null;
    const { userId, roomId, salt } = enterChannelDto;
    let participant: ChannelParticipant;
    const room = await this.roomsRepository.findOneBy({ id: roomId });
    if (!room) throw new NotFoundException(`Cant't find room ${roomId}`);

    if (room.type != 0) {
      const row = await this.channelParticipantsRepository.findOne({
        where: { user: { id: userId }, room: { id: roomId } },
      });
      if (!row) {
        if (room.type == 2 && salt !== room.salt)
          throw new ForbiddenException('Password is not correct');
        participant = this.channelParticipantsRepository.create({
          user: await this.usersRepository.findOneBy({ id: userId }),
          room,
        });
        if (!participant.user)
          throw new NotFoundException(`Cant't find participant ${userId}`);
        user = participant.user;
        await this.channelParticipantsRepository.save(participant);
      }
    }
    client.rooms.clear();
    client.join(room.title);
    if (user)
      client.to(room.title).emit('roomMessage', {
        message: `${user.nickname}님이 방${room.name}에 입장하였습니다.`,
      });
    if (!user)
      console.log(`이미 방에 있던 ${userId}님이 방${roomId}에 들어왔습니다.`);
  }

  async leaveChannel(
    client: Socket,
    leaveChannelDto: LeaveChannelDto,
  ): Promise<void> {
    const { roomId, userId } = leaveChannelDto;
    const deleteParticipant = await this.channelParticipantsRepository.findOne({
      relations: { user: true, room: true },
      where: { room: { id: roomId }, user: { id: userId } },
    });
    if (deleteParticipant !== null) {
      await this.channelParticipantsRepository.delete({
        id: deleteParticipant.id,
      });
    } else {
      throw new NotFoundException(
        `Can't not delete user ${userId} in room ${roomId}`,
      );
    }
    if (deleteParticipant.auth === 0) {
      const owner = await this.channelParticipantsRepository.findOne({
        where: { room: { id: roomId } },
      });
      if (owner !== null) {
        owner.auth = 0;
        await this.channelParticipantsRepository.save(owner);
      } else {
        await this.roomsRepository.delete(roomId);
      }
    }
    client
      .to(deleteParticipant.room.title)
      .emit(
        'roomMessage',
        `${deleteParticipant.user.nickname}이(가) 방을 나갔습니다.`,
      );
    client.rooms.clear();
    client.leave(deleteParticipant.room.title);
  }

  async sendMessage(client: Socket, sendMessageDto: SendMessageDto) {
    const { roomId, userId, body } = sendMessageDto;
    const msg = this.messagesRepository.create({
      date: new Date(),
      body,
      room: await this.roomsRepository.findOneBy({ id: roomId }),
      user: await this.usersRepository.findOneBy({ id: userId }),
    });

    // TODO: 순서 보장을 위해, 큐에 넣어서 처리하는 방식 구현 필요!
    await this.messagesRepository.save(msg);

    const messageDto: MessageDto = {
      nickname: msg.user.nickname,
      image: msg.user.image,
      body,
    };
    client.to(msg.room.title).emit('userMessage', messageDto);
  }

  async getMessages(roomId: number): Promise<GetMessagesDto[]> {
    const msgs = await this.messagesRepository.find({
      relations: { user: true },
      where: { room: { id: roomId } },
      order: { id: 'ASC' },
    });
    const result: GetMessagesDto[] = [];
    msgs.map((msg) => {
      const message = {
        userId: msg.user.id,
        nickname: msg.user.nickname,
        image: msg.user.image,
        body: msg.body,
      };
      result.push(message);
    });
    return result;
  }
}
