import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { DatabaseModule } from 'src/database/database.module';
import { RoomService } from './rooms.service';
import { roomsProviders } from './rooms.providers';
import { usersProviders } from '../users/users.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [RoomsController],
  providers: [RoomService, ...roomsProviders, ...usersProviders],
  exports: [RoomService],
})
export class RoomModule {}
