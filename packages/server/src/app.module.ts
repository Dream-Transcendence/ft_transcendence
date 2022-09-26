import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RoomModule } from './chats/rooms.module';
import { GameModule } from './game/game.module';
import { ChannelParticipantsModule } from './channel-participants/channel-participants.module';

@Module({
  imports: [UsersModule, RoomModule, GameModule],
  controllers: [],
})
export class AppModule {}
