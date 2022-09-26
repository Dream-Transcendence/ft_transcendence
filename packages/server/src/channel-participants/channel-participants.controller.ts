import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateChannelParticipantDto } from './dto/channel-participants.dto';

@ApiTags('channel-participants')
@Controller('channel-participants')
export class ChannelParticipantsController {
  // constructor() {}

  @Get('/:roomId')
  @ApiOperation({ summary: '채널 참여자 목록' })
  getChannelParticipants(@Param('roomId') roomId: number) {
    return;
  }

  @Post('/:roomId')
  @ApiOperation({ summary: '채널 참여자 목록 생성' })
  createChannelParticipant(
    @Param('roomId') roomId: number,
    @Body() createChannelParticipantDto: CreateChannelParticipantDto,
  ) {
    return;
  }

  // endpoint 수정 필요?
  @Delete('/:roomId/:userId')
  @ApiOperation({ summary: '채널 참여자 목록 삭제' })
  deleteChannelParticipant(
    @Param('roomId') roomId: number,
    @Param('userId') userId: number,
  ) {
    return;
  }
}
