import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from 'src/users/users.providers';
import { GameController } from './game.controller';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';

@Module({
  imports: [DatabaseModule],
  controllers: [GameController],
  providers: [GameService, GameGateway, ...usersProviders],
})
export class GameModule {}
