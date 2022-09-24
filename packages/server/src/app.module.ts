import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RoomModule } from './rooms/rooms.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [UsersModule, RoomModule, GameModule],
  controllers: [],
})
export class AppModule {}
