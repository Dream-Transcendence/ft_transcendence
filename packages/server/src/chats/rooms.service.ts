import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Room } from '../chats/rooms.entity';
import { CreateRoomDto } from '../chats/dto/rooms.dto';
import { RoomDto } from './dto/room.dto';

@Injectable()
export class RoomService {
  constructor(
    @Inject('ROOMS_REPOSITORY')
    private roomsRepository: Repository<Room>,
  ) {}

  async createRoom(createRoomDto: CreateRoomDto): Promise<RoomDto> {
    const { name, type, salt, title } = createRoomDto;

    let room = this.roomsRepository.create({
      // id,
      name,
      type,
      salt,
      title,
      image: 'default',
    });
    room = await this.roomsRepository.save(room);
    return room;
  }

  async getChannels(): Promise<RoomDto[]> {
    return this.roomsRepository.find();
  }
}
