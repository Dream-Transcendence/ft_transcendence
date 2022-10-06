import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RoomModule } from './chats/rooms.module';
import { GameModule } from './game/game.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [UsersModule, RoomModule, GameModule, EventsModule],
  controllers: [],
})
export class AppModule {}
