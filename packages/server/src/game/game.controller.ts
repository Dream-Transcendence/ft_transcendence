import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('game')
@Controller('game')
export class GameController {
  // @Get('/:id/records')
  // @ApiOperation({ summary: '전적 목록' })
  // getRecords() {
  //   return;
  // }
  // @Get('/:id/overalls')
  // @ApiOperation({ summary: '등급 및 승패' })
  // getOveralls() {
  //   return;
  // }
  // @Post('/:id/record')
  // @ApiOperation({ summary: '전적 생성' })
  // createRecord() {
  //   return;
  // }
}
