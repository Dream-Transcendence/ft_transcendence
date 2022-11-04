import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GameRoomDto } from './game.dto';
import { GameService } from './game.service';

// @ApiTags('game')
@Controller('game')
@UseGuards(AuthGuard('jwt'))
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('live-games')
  @ApiOperation({ summary: 'Get live games' })
  async getLiveGames(): Promise<GameRoomDto[]> {
    return await this.gameService.getLiveGames();
  }
}
