import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Equal, Repository, In } from 'typeorm';
import { ChannelParticipant, Room } from '../chats/rooms.entity';
import {
  CreateChannelDto,
  PatchUserInfoDto,
  RoomPasswordDto,
  PatchRoomInfoDto,
  createDmDto,
} from '../chats/dto/rooms.dto';
import { ChannelParticipantDto, RoomDto } from './dto/room.dto';
import { Block, User } from '../users/users.entity';
import { UserDto } from '../users/dto/user.dto';
import { DmParticipant } from './rooms.entity';
import { GetUserChatsDto } from './dto/rooms.dto';

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
  ) {}

  // ANCHOR Room Service
  async createChannel(createChannelDto: CreateChannelDto): Promise<RoomDto> {
    const { userId, name, type, salt, title, participantIds } =
      createChannelDto;
    // NOTE room info 저장
    let room = this.roomsRepository.create({
      name,
      type,
      salt,
      title,
    });
    room = await this.roomsRepository.save(room);
    // Channel participants 저장
    const participants: ChannelParticipant[] = [];
    const Ids = [...participantIds, userId];
    const promises = Ids.map(async (id) => {
      const participant: ChannelParticipant =
        this.channelParticipantsRepository.create();
      participant.user = await this.usersRepository.findOneBy({ id });
      participant.room = room;
      if (!participant.user) {
        throw new NotFoundException(`Cant't find participant ${id}`);
      }
      participants.push(participant);
    });
    await Promise.all(promises);
    await this.channelParticipantsRepository.save(participants);
    // channel owner로 auth 변경
    await this.patchUserInfo(room.id, userId, { auth: 0 });
    return room;
  }

  async getChannels(): Promise<RoomDto[]> {
    return this.roomsRepository.findBy({
      type: 1 || 2,
    });
  }

  async getUserChats(userId: number): Promise<GetUserChatsDto> {
    const channels = await this.channelParticipantsRepository.find({
      relations: { room: true },
      where: { user: { id: userId } },
    });
    const channelsList = channels.map((channel) => channel.room);
    const dms = await this.dmParticipantsRepository.find({
      relations: { room: true },
      where: { user: { id: userId } },
    });
    const dmsList = dms.map((dm) => dm.room);
    return { channelsList, dmsList };
  }

  async getRoomInfo(roomId: number): Promise<RoomDto> {
    return this.roomsRepository.findOneBy({
      id: roomId,
    });
  }

  async enterRoom(
    roomId: number,
    userId: number,
    roomPasswordDto: RoomPasswordDto,
  ): Promise<UserDto> {
    const { salt } = roomPasswordDto;
    let participant: ChannelParticipant;
    const roomSalt = await (await this.getRoomInfo(roomId)).salt;
    if (roomSalt === null || salt === roomSalt) {
      participant = this.channelParticipantsRepository.create();
      participant.user = await this.usersRepository.findOneBy({ id: userId });
      participant.room = await this.roomsRepository.findOneBy({ id: roomId });
      if (!participant.user || !participant.room) {
        throw new NotFoundException(
          `Cant't find room${roomId} or participant ${userId}`,
        );
      }
      this.channelParticipantsRepository.save(participant);
    } else throw new ForbiddenException('Password is not correct');
    return participant.user;
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
        participant.id,
        participant.user,
        participant.auth,
        participant.status,
        participant.statusStartDate,
        blockedBool,
      );
      results.push(result);
    });
    return results;
  }

  async deleteChannelParticipant(
    roomId: number,
    userId: number,
  ): Promise<void> {
    const deleteParticipant = await this.channelParticipantsRepository.findOne({
      where: { room: { id: roomId }, user: { id: userId } },
    });
    if (deleteParticipant !== undefined) {
      await this.channelParticipantsRepository.delete({
        id: deleteParticipant.id,
      });
    } else {
      throw new NotFoundException(
        `Can't not delete user with user${userId} in room ${roomId}`,
      );
    }
  }

  async patchRoomInfo(roomId: number, patchRoomInfoDto: PatchRoomInfoDto) {
    const { name, image, salt } = patchRoomInfoDto;
    // image 기본으로 요청 : null, image 요청이 아닐 때 undefined
    const room = await this.roomsRepository.findOneBy({ id: roomId });
    if (name !== undefined) room.name = name;
    if (image !== undefined) room.image = image;
    if (salt !== undefined) room.salt = salt;
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
  async createDm(createDmDto: createDmDto): Promise<UserDto[]> {
    const { userId, participantId, title } = createDmDto;
    // NOTE dm info 저장
    let dm = this.roomsRepository.create({
      type: 0,
      title,
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
        throw new NotFoundException(`Cant't find participant ${id}`);
      }
      participants.push(participant);
    });
    await Promise.all(promises);
    this.dmParticipantsRepository.save(participants);
    return participants.map((participant) => participant.user);
  }

  // FIXME[epic=sonkang] 두명의 정보를 보낼 것인지.. userId를 받아서 상대방 정보만 보낼 것인지
  async getDmParticipants(roomId: number): Promise<UserDto[]> {
    const participants = await this.dmParticipantsRepository.find({
      relations: { user: true },
      // where: { room: { id: roomId }, user: { id: userId } },
    });
    return participants.map((participant) => participant.user);
  }

  async deleteDmParticipant(roomId: number, userId: number): Promise<void> {
    const deleteParticipant = await this.dmParticipantsRepository.findOne({
      where: { room: { id: roomId }, user: { id: userId } },
    });
    console.log(deleteParticipant);
    if (deleteParticipant !== undefined) {
      await this.dmParticipantsRepository.delete({ id: deleteParticipant.id });
    }
    return;
  }
}
