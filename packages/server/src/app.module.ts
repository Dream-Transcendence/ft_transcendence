import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RoomModule } from './chats/rooms.module';
import { GameModule } from './game/game.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    RoomModule,
    GameModule,
    ScheduleModule.forRoot(),
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
