import { Module } from '@nestjs/common';
import { roomsProviders } from 'src/chats/rooms.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UserGateway } from './user.gateway';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UserService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UserService, UserGateway, ...usersProviders, ...roomsProviders],
})
export class UsersModule {}
