import { Module } from '@nestjs/common';
import { roomsProviders } from 'src/chats/rooms.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UserGateway } from 'src/users/user.gateway';
import { UsersModule } from 'src/users/users.module';
import { usersProviders } from 'src/users/users.providers';
import { UserService } from 'src/users/users.service';
import { GameController } from './game.controller';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [GameController],
  providers: [
    GameService,
    GameGateway,
    ...usersProviders,
    ...roomsProviders,
    UserGateway,
    UserService,
  ],
})
export class GameModule {}
