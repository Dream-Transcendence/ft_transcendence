import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RoomModule } from './chats/rooms.module';
import { GameModule } from './game/game.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    RoomModule,
    GameModule,
    ScheduleModule.forRoot(),
    AuthModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
})
export class AppModule {}
