import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CheckGameExistDto, GameRoomDto } from './game.dto';
import { GameService } from './game.service';

// @ApiTags('game')
@Controller('game')
@UseGuards(AuthGuard('jwt'))
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('rooms/:title')
  @ApiOperation({ summary: 'Get game room' })
  async checkGameExist(
    @Param('title') title: string,
  ): Promise<CheckGameExistDto> {
    return await this.gameService.checkGameExist(title);
  }

  @Get('live-games')
  @ApiOperation({ summary: 'Get live games' })
  async getLiveGames(): Promise<GameRoomDto[]> {
    return await this.gameService.getLiveGames();
  }
}
