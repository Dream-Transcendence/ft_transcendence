import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ChannelParticipant, Room } from '../chats/rooms.entity';
import {
  CreateRoomDto,
  PatchUserAuthDto,
  RoomPasswordDto,
} from '../chats/dto/rooms.dto';
import { RoomDto } from './dto/room.dto';
import {
  AddParticipantsDto,
  PatchUserStatusDto,
  PatchRoomInfoDto,
} from './dto/rooms.dto';
import { User } from '../users/users.entity';
import { UserDto } from '../users/dto/user.dto';
import { DmParticipant } from './rooms.entity';

/********************************/
/*         Room service         */
/********************************/

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
  ) {}

  async createRoom(createRoomDto: CreateRoomDto): Promise<RoomDto> {
    const { name, type, salt, title } = createRoomDto;

    let room = this.roomsRepository.create({
      name,
      type,
      salt,
      title,
    });
    room = await this.roomsRepository.save(room);
    return room;
  }

  async getChannels(): Promise<RoomDto[]> {
    return this.roomsRepository.findBy({
      type: 1 || 2,
    });
  }

  async getRoomInfo(roomId: number): Promise<RoomDto> {
    return this.roomsRepository.findOneBy({
      id: roomId,
    });
  }

  async enterRoom(
    roomId: number,
    roomPasswordDto: RoomPasswordDto,
  ): Promise<boolean> {
    const { salt } = roomPasswordDto;
    const roomSalt = await (await this.getRoomInfo(roomId)).salt;
    if (salt === roomSalt) return true;
    else return false;
  }

  async addChannelParticipants(
    roomId: number,
    addParticipantDto: AddParticipantsDto,
  ): Promise<UserDto[]> {
    const { participantIds } = addParticipantDto;

    const participants: ChannelParticipant[] = [];
    const promises = participantIds.map(async (id) => {
      const participant: ChannelParticipant =
        this.channelParticipantsRepository.create();
      participant.user = await this.usersRepository.findOneBy({ id });
      participant.room = await this.roomsRepository.findOneBy({ id: roomId });
      if (!participant.user || !participant.room) {
        throw new NotFoundException(
          `Cant't find room${roomId} or participant ${id}`,
        );
      }
      participants.push(participant);
    });
    await Promise.all(promises);
    console.log(participants);
    this.channelParticipantsRepository.save(participants);
    return participants.map((participant) => participant.user);
  }

  async getChannelParticipants(roomId: number): Promise<ChannelParticipant[]> {
    const channelParticipants = await this.channelParticipantsRepository.find({
      relations: { user: true },
      where: { room: { id: roomId } },
    });
    console.log(channelParticipants);
    return channelParticipants;
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
    if (name === null) console.log('null');
    if (name === undefined) console.log('undefined');
    const room = await this.roomsRepository.findOneBy({ id: roomId });
    if (name !== undefined) room.name = name;
    if (image !== undefined) room.image = image;
    if (salt !== undefined) room.salt = salt;
    await this.roomsRepository.save(room);
  }

  async patchUserAuth(
    roomId: number,
    userId: number,
    patchUserAuthDto: PatchUserAuthDto,
  ): Promise<void> {
    const { auth } = patchUserAuthDto;
    const user = await this.channelParticipantsRepository.findOne({
      where: { room: { id: roomId }, user: { id: userId } },
    });
    await this.channelParticipantsRepository.update(user.id, { auth });
  }

  async patchUserStatus(
    roomId: number,
    userId: number,
    patchUserStatusDto: PatchUserStatusDto,
  ): Promise<void> {
    const { status } = patchUserStatusDto;
    const user = await this.channelParticipantsRepository.findOne({
      where: { room: { id: roomId }, user: { id: userId } },
    });
    await this.channelParticipantsRepository.update(user.id, { status });
  }

  /********************************/
  /*          DM service          */
  /********************************/

  async addDmParticipants(
    roomId: number,
    addParticipantsDto: AddParticipantsDto,
  ): Promise<UserDto[]> {
    const { participantIds } = addParticipantsDto;
    const participants: DmParticipant[] = [];
    const promises = participantIds.map(async (id) => {
      const participant: DmParticipant = this.dmParticipantsRepository.create();
      participant.user = await this.usersRepository.findOneBy({ id });
      participant.room = await this.roomsRepository.findOneBy({ id: roomId });
      if (!participant.user || !participant.room) {
        throw new NotFoundException(
          `Cant't find room${roomId} or participant ${id}`,
        );
      }
      participants.push(participant);
    });
    await Promise.all(promises);
    console.log(participants);
    this.dmParticipantsRepository.save(participants);
    return participants.map((participant) => participant.user);
  }

  async getDmParticipants(roomId: number): Promise<UserDto[]> {
    const participants = await this.dmParticipantsRepository.find({
      relations: { user: true },
      where: { room: { id: roomId } },
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
