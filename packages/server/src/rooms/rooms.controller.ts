import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('room')
@Controller('rooms')
export class RoomsController {
  constructor() {}

  @Post()
  @ApiOperation({ summary: '채팅방 생성' })
  createRoom() {
    return;
  }

  @Get('/channels')
  @ApiOperation({ summary: '공개, 보호 채널 목록' })
  getChannels() {
    return;
  }

  @Post('/:roomId')
  @ApiOperation({ summary: 'protected 채팅방 입장' })
  enterRoom(
    @Param('roomId') roomId: number,
    @Body('password') password: string,
  ) {
    return;
  }

  @Get('/:roomId/channel/participants')
  @ApiOperation({ summary: '채널 참여자 목록' })
  getChannelParticipants() {
    return;
  }

  @Post('/:roomId/channel/participants')
  @ApiOperation({ summary: '채널 참여자 추가' })
  addChannelParticipant() {
    return;
  }

  @Delete('/:roomId/channel/participants/:userId')
  @ApiOperation({ summary: '채널 참여자 삭제' })
  deleteChannelParticipant() {
    return;
  }

  @Get('/:roomId/dm/participants')
  @ApiOperation({ summary: 'DM 참여자 목록' })
  getDMParticipants() {
    return;
  }

  @Get('/:roomId/messages')
  @ApiOperation({ summary: '채팅방 메시지 목록' })
  getMessages() {
    return;
  }

  @Patch('/:roomId/image')
  @ApiOperation({ summary: '채팅방 이미지 수정' })
  patchRoomImage() {
    return;
  }

  @Patch('/:roomId/name')
  @ApiOperation({ summary: '채팅방 이름 수정' })
  patchRoomName() {
    return;
  }

  @Patch('/:roomId/password')
  @ApiOperation({ summary: '채팅방 비밀번호 수정' })
  patchRoomPassword() {
    return;
  }

  @Patch('/:roomId/users/:userId/auth')
  @ApiOperation({ summary: '채팅 유저 권한 변경' })
  patchUserAuth() {
    return;
  }

  @Patch('/:roomId/users/:userId/status')
  @ApiOperation({ summary: '채팅 유저 상태 변경' })
  patchUserStatus() {
    return;
  }
}
