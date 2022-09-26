import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Logger,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import {
  AddChannelParticipantDto,
  CreateRoomDto,
  RoomPasswordDto,
  PatchRoomInfoDto,
  PatchUserAuthDto,
  PatchUserStatusDto,
} from './dto/rooms.dto';

@ApiTags('room')
@Controller('rooms')
export class RoomsController {
  private logger = new Logger('RoomsController');
  // constructor() {}

  @Post()
  @ApiOperation({ summary: '채팅방 생성' })
  createRoom(@Body() createRoomDto: CreateRoomDto) {
    this.logger.log(`createRoom: ${JSON.stringify(createRoomDto)}`);
    // return this.roomsService.createRoom(createRoomDto);
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

  @Patch('/:roomid')
  @ApiOperation({ summary: '체팅방 정보 수정' })
  patchRoomInfo(
    @Param('roomId') roomId: number,
    @Body() patchRoomInfoDto: PatchRoomInfoDto,
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
// 채팅 유저 권한과 상태를 하나의 api로 통합할지 고민
