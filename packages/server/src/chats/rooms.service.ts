import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Equal, Repository, In, Not } from 'typeorm';
import { ChannelParticipant, Message, Room } from '../chats/rooms.entity';
import {
  CreateChannelDto,
  PatchUserInfoDto,
  RoomPasswordDto,
  PatchChannelInfoDto,
  CreateDmDto,
  ChannelParticipantDto,
  ChannelDto,
  EnterChannelDto,
  LeaveChannelDto,
  SendMessageDto,
  UserMessageDto,
} from '../chats/dto/rooms.dto';
import { Block, User } from '../users/users.entity';
import { UserDto } from '../users/dto/user.dto';
import { DmParticipant } from './rooms.entity';
import { Socket } from 'socket.io';

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
      title: 'socket title',
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
    delete room.title;
    return room;
  }

  async getChannels(): Promise<ChannelDto[]> {
    const roomType = [1, 2];
    const channels = await this.roomsRepository.find({
      where: { type: In(roomType) },
      order: { id: 'DESC' },
    });
    channels.map((channel) => {
      delete channel.salt;
      delete channel.title;
    });
    return channels;
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
    delete channel.id;
    delete channel.salt;
    delete channel.title;
    return channel;
  }

  async enterChannel(
    roomId: number,
    userId: number,
    roomPasswordDto: RoomPasswordDto,
  ) {
    const { salt } = roomPasswordDto;
    let participant: ChannelParticipant;
    const room = await this.roomsRepository.findOneBy({ id: roomId });
    if (room.type !== 2 || salt === room.salt) {
      participant = this.channelParticipantsRepository.create();
      participant.user = await this.usersRepository.findOneBy({ id: userId });
      participant.room = await this.roomsRepository.findOneBy({ id: roomId });
      if (!participant.user || !participant.room) {
        throw new NotFoundException(
          `Cant't find room ${roomId} or participant ${userId}`,
        );
      }
      this.channelParticipantsRepository.save(participant);
    } else throw new ForbiddenException('Password is not correct');
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

  async deleteChannelParticipant(
    roomId: number,
    userId: number,
  ): Promise<void> {
    const deleteParticipant = await this.channelParticipantsRepository.findOne({
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
  }

  async patchChannelInfo(
    roomId: number,
    patchChannelInfoDto: PatchChannelInfoDto,
  ) {
    const { name, image, salt } = patchChannelInfoDto;
    // image 기본으로 요청 : null, image 요청이 아닐 때 undefined
    const room = await this.roomsRepository.findOneBy({ id: roomId });
    if (name !== undefined) room.name = name;
    if (image !== undefined) room.image = image;
    if (room.salt === null && salt !== undefined) room.type = 2;
    if (room.salt !== null && salt === null) room.type = 1;
    if (salt !== undefined) room.salt = salt;
    // salt를 삭제하고 싶을 때 null 주기
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
  async createDm(createDmDto: CreateDmDto): Promise<void> {
    const { userId, participantId } = createDmDto;
    // NOTE dm info 저장
    let dm = this.roomsRepository.create({
      type: 0,
      // title,
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

  // async deleteDmParticipant(roomId: number, userId: number): Promise<void> {
  //   const deleteParticipant = await this.dmParticipantsRepository.findOne({
  //     where: { room: { id: roomId }, user: { id: userId } },
  //   });
  //   console.log(deleteParticipant);
  //   if (deleteParticipant !== undefined) {
  //     await this.dmParticipantsRepository.delete({ id: deleteParticipant.id });
  //   }
  //   return;
  // }

  // ANCHOR: Socket
  async handleEnterChannel(client: Socket, enterChannelDto: EnterChannelDto) {
    let user: User = null;
    const { roomId, userId } = enterChannelDto;
    const room = await this.roomsRepository.findOneBy({ id: roomId });
    if (!room) throw new NotFoundException(`Can't find room ${roomId}`);

    // DM은 바로 입장, 채널은 아래 로직에 따라 입장
    if (room.type !== 0) {
      const row = await this.channelParticipantsRepository.findOne({
        relations: ['user'],
        where: { room: { id: roomId }, user: { id: userId } },
      });
      // 유저가 없으면 참여자 DB에 추가
      if (row === null) {
        // protected인데, salt가 틀리면 참여 불가
        if (room.type === 2) {
          if (room.salt !== enterChannelDto.salt) return { isEntered: false };
        }
        const participant = this.channelParticipantsRepository.create({
          user: await this.usersRepository.findOneBy({ id: userId }),
          room,
        });
        user = participant.user;
        await this.channelParticipantsRepository.save(participant);
      }
    }
    // 유저 룸 초기화 후, roomId 룸에 추가
    client.rooms.clear();
    client.join(roomId.toString());
    // 새 참여자라면, 입장 메세지 쏴주기
    if (user)
      client
        .to(roomId.toString())
        .emit('roomMessage', `${user.nickname}이(가) 입장했습니다.`);

    // 참여 성공
    // NOTE: 유저 입장 후, 채널 메세지와 참여자 목록 가져오는 API 추가(REST)
    return { isEntered: true };
  }

  async handleLeaveChannel(client: Socket, leaveChannelDto: LeaveChannelDto) {
    const { roomId, userId } = leaveChannelDto;
    await this.channelParticipantsRepository.delete({
      room: { id: roomId },
      user: { id: userId },
    });
    const user = await this.usersRepository.findOneBy({ id: userId });

    client
      .to(roomId.toString())
      .emit('roomMessage', `${user.nickname}이(가) 나갔습니다.`);
    client.rooms.clear();
    client.leave(roomId.toString());

    return { isLeft: true };
  }

  async handleSendMessage(client: Socket, sendMessageDto: SendMessageDto) {
    const { roomId, userId, body } = sendMessageDto;

    const message = this.messagesRepository.create({
      date: new Date(),
      body,
      room: await this.roomsRepository.findOneBy({ id: roomId }),
      user: await this.usersRepository.findOneBy({ id: userId }),
    });

    // TODO: 순서 보장을 위해, 큐에 넣어서 처리하는 방식 구현 필요!
    await this.messagesRepository.save(message);

    const userMessageDto: UserMessageDto = {
      id: message.id,
      date: message.date,
      user: {
        id: message.user.id,
        nickname: message.user.nickname,
        image: message.user.image,
      },
      body: message.body,
    };

    client.to(roomId.toString()).emit('userMessage', userMessageDto);

    return;
  }
}
