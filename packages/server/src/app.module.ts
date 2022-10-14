import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RoomModule } from './chats/rooms.module';
import { GameModule } from './game/game.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [UsersModule, RoomModule, GameModule, ScheduleModule.forRoot()],
  controllers: [],
})
export class AppModule {}
