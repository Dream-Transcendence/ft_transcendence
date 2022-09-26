import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomRepository } from './rooms.repository';
import { CreateRoomDto } from './dto/rooms.dto';
import { Room } from './rooms.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomRepository)
    private roomRepository: RoomRepository,
  ) {}

  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    const { name, type, salt, title, image } = createRoomDto;

    const room = this.roomRepository.create({
      name,
      type,
      salt,
      title,
      image,
    });
    await this.roomRepository.save(room);
    return room;
  }
}
