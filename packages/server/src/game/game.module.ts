import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { GameController } from './game.controller';
import { GameGateway } from './game.gateway';
import { GameService } from './game/game.service';

@Module({
  imports: [DatabaseModule],
  controllers: [GameController],
  providers: [GameGateway, GameService],
})
export class GameModule {}
