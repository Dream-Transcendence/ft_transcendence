import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { DatabaseModule } from 'src/database/database.module';
import { RoomService } from './rooms.service';
import { roomsProviders } from './rooms.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [RoomsController],
  providers: [RoomService, ...roomsProviders],
})
export class RoomModule {}
