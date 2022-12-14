import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { DatabaseModule } from 'src/database/database.module';
import { RoomService } from './rooms.service';
import { roomsProviders } from './rooms.providers';
import { usersProviders } from '../users/users.providers';
import { RoomsGateway } from './rooms.gateway';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [RoomsController],
  providers: [RoomService, RoomsGateway, ...roomsProviders, ...usersProviders],
})
export class RoomModule {}
