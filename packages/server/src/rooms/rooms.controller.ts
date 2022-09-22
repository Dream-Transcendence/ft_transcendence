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
import {
  AddChannelParticipantDto,
  CreateRoomDto,
  PatchRoomImageDto,
  PatchRoomNameDto,
  PatchUserAuthDto,
  PatchUserStatusDto,
  RoomPasswordDto,
} from './dto/rooms.dto';

@ApiTags('room')
@Controller('rooms')
export class RoomsController {
  constructor() {}

  @Post()
  @ApiOperation({ summary: '채팅방 생성' })
  createRoom(@Body() createRoomDto: CreateRoomDto) {
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
    @Body() roomPasswordDto: RoomPasswordDto,
  ) {
    return;
  }

  @Get('/:roomId/channel/participants')
  @ApiOperation({ summary: '채널 참여자 목록' })
  getChannelParticipants(@Param('roomId') roomId: number) {
    return;
  }

  @Post('/:roomId/channel/participants')
  @ApiOperation({ summary: '채널 참여자 추가' })
  addChannelParticipant(
    @Param('roomId') roomId: number,
    @Body() addChannelParticipantDto: AddChannelParticipantDto,
  ) {
    return;
  }

  @Delete('/:roomId/channel/participants/:userId')
  @ApiOperation({ summary: '채널 참여자 삭제' })
  deleteChannelParticipant(
    @Param('roomId') roomId: number,
    @Param('userId') userId: number,
  ) {
    return;
  }

  @Get('/:roomId/dm/participants')
  @ApiOperation({ summary: 'DM 참여자 목록' })
  getDMParticipants(@Param('roomId') roomId: number) {
    return;
  }

  @Get('/:roomId/messages')
  @ApiOperation({ summary: '채팅방 메시지 목록' })
  getMessages(@Param('roomId') roomId: number) {
    return;
  }

  @Patch('/:roomId/image')
  @ApiOperation({ summary: '채팅방 이미지 수정' })
  patchRoomImage(
    @Param('roomId') roomId: number,
    @Body() patchRoomImageDto: PatchRoomImageDto,
  ) {
    return;
  }

  @Patch('/:roomId/name')
  @ApiOperation({ summary: '채팅방 이름 수정' })
  patchRoomName(
    @Param('roomId') roomId: number,
    @Body() patchRoomNameDto: PatchRoomNameDto,
  ) {
    return;
  }

  @Patch('/:roomId/password')
  @ApiOperation({ summary: '채팅방 비밀번호 수정' })
  patchRoomPassword(
    @Param('roomId') roomId: number,
    @Body() roomPasswordDto: RoomPasswordDto,
  ) {
    return;
  }

  @Patch('/:roomId/users/:userId/auth')
  @ApiOperation({ summary: '채팅 유저 권한 변경' })
  patchUserAuth(
    @Param('roomId') roomId: number,
    @Param('userId') userId: number,
    @Body() patchUserAuthDto: PatchUserAuthDto,
  ) {
    return;
  }

  @Patch('/:roomId/users/:userId/status')
  @ApiOperation({ summary: '채팅 유저 상태 변경' })
  patchUserStatus(
    @Param('roomId') roomId: number,
    @Param('userId') userId: number,
    @Body() patchUserStatusDto: PatchUserStatusDto,
  ) {
    return;
  }
}
