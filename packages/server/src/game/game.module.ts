import { Module } from '@nestjs/common';
import { GameController } from './game.controller';

@Module({
  controllers: [GameController],
})
export class GameModule {}
