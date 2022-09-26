import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { RoomModule } from './rooms/rooms.module';
import { GameModule } from './game/game.module';
import { ChannelParticipantsModule } from './channel-participants/channel-participants.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UsersModule,
    RoomModule,
    GameModule,
    ChannelParticipantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
