import { Module } from '@nestjs/common';
import { roomsProviders } from 'src/chats/rooms.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UserService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  // NOTE: UserGateway 프로바이더를 넣어두면, 게임에도 있기 때문에 소켓이 두번씩 불러진다.
  providers: [UserService, ...usersProviders, ...roomsProviders],
})
export class UsersModule {}
