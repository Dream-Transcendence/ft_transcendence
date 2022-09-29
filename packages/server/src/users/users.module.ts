import { Module } from '@nestjs/common';
import { roomsProviders } from 'src/chats/rooms.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UserService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UserService, ...usersProviders, ...roomsProviders],
})
export class UsersModule {}
