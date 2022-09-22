import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';

@Module({
  controllers: [RoomsController],
  providers: [],
})
export class RoomModule {}
