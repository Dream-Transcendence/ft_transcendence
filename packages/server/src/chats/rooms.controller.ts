import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ChannelParticipantDto, RoomDto } from './dto/room.dto';
import {
  AddParticipantsDto,
  CreateRoomDto,
  RoomPasswordDto,
  PatchRoomInfoDto,
  PatchUserAuthDto,
  PatchUserStatusDto,
} from './dto/rooms.dto';
import { RoomService } from './rooms.service';
import { UserDto } from '../users/dto/user.dto';

@ApiTags('room')
@Controller('rooms')
export class RoomsController {
  private logger = new Logger('RoomsController');
  constructor(private roomService: RoomService) {}

  /********************************/
  /*      channel controller      */
  /********************************/

  @Post()
  @ApiOperation({ summary: '채팅방 생성' })
  @ApiCreatedResponse({ description: '채팅방 생성 성공', type: RoomDto })
  createRoom(@Body() createRoomDto: CreateRoomDto): Promise<RoomDto> {
    this.logger.log(`createRoom: ${JSON.stringify(createRoomDto)}`);
    return this.roomService.createRoom(createRoomDto);
  }

  @Get('/channels')
  @ApiOperation({ summary: '공개, 보호 채널 목록' })
  @ApiOkResponse({
    description: '공개, 보호 채널 목록 가져오기 성공',
    type: [RoomDto],
  })
  getChannels() {
    this.logger.log(`getChannels`);
    return this.roomService.getChannels();
  }

  @Get('/channel/:roomId')
  @ApiOperation({ summary: '채팅방 정보 가져오기' })
  @ApiOkResponse({ description: '채팅방 정보 가져오기 성공', type: RoomDto })
  getRoomInfo(@Param('roomId') roomId: number): Promise<RoomDto> {
    this.logger.log(`getRoomInfo`);
    return this.roomService.getRoomInfo(roomId);
  }

  @Post('/:roomId')
  @ApiOperation({ summary: 'protected 채팅방 입장' })
  @ApiOkResponse({ description: '채팅방 입장 여부' })
  enterRoom(
    @Param('roomId') roomId: number,
    @Body() roomPasswordDto: RoomPasswordDto,
  ) {
    return this.roomService.enterRoom(roomId, roomPasswordDto);
  }

  @Get('/:roomId/channel/participants')
  @ApiOperation({ summary: '채널 참여자 목록' })
  @ApiOkResponse({
    description: '채널 참여자 목록 가져오기 성공',
    type: [ChannelParticipantDto],
  })
  getChannelParticipants(@Param('roomId') roomId: number) {
    this.logger.log('getChannelParticipants');
    return this.roomService.getChannelParticipants(roomId);
  }

  @Post('/:roomId/channel/participants')
  @ApiOperation({ summary: '채널 참여자 추가' })
  @ApiOkResponse({ description: '채널 참여자 추가 성공', type: [UserDto] })
  addChannelParticipants(
    @Param('roomId') roomId: number,
    @Body() addChannelParticipantsDto: AddParticipantsDto,
  ) {
    this.logger.log('addChannelParticipant');
    return this.roomService.addChannelParticipants(
      roomId,
      addChannelParticipantsDto,
    );
  }

  @Delete('/:roomId/channel/participants/:userId')
  @ApiOperation({ summary: '채널 참여자 삭제' })
  @ApiOkResponse({ description: '채널 참여자 삭제 성공' })
  deleteChannelParticipant(
    @Param('roomId') roomId: number,
    @Param('userId') userId: number,
  ) {
    this.logger.log('deleteChannelParticipant');
    return this.roomService.deleteChannelParticipant(roomId, userId);
  }

  @Get('/:roomId/messages')
  @ApiOperation({ summary: '채팅방 메시지 목록' })
  getMessages(@Param('roomId') roomId: number) {
    return;
  }

  @Patch('/:roomid')
  @ApiOperation({ summary: '체팅방 정보 수정' })
  @ApiOkResponse({ description: '체팅방 정보 수정 성공' })
  patchRoomInfo(
    @Param('roomId') roomId: number,
    @Body() patchRoomInfoDto: PatchRoomInfoDto,
  ) {
    this.logger.log('patchRoomInfo');
    return this.roomService.patchRoomInfo(roomId, patchRoomInfoDto);
  }

  @Patch('/:roomId/users/:userId/auth')
  @ApiOperation({ summary: '채팅 유저 권한 변경' })
  @ApiOkResponse({ description: '채팅 유저 권한 변경 성공' })
  patchUserAuth(
    @Param('roomId') roomId: number,
    @Param('userId') userId: number,
    @Body() patchUserAuthDto: PatchUserAuthDto,
  ) {
    this.logger.log('patchUserAuth');
    return this.roomService.patchUserAuth(roomId, userId, patchUserAuthDto);
  }

  @Patch('/:roomId/users/:userId/status')
  @ApiOperation({ summary: '채팅 유저 상태 변경' })
  @ApiOkResponse({ description: '채팅 유저 상태 변경 성공' })
  patchUserStatus(
    @Param('roomId') roomId: number,
    @Param('userId') userId: number,
    @Body() patchUserStatusDto: PatchUserStatusDto,
  ) {
    this.logger.log('patchUserStatus');
    return this.roomService.patchUserStatus(roomId, userId, patchUserStatusDto);
  }
  // 채팅 유저 권한과 상태를 하나의 api로 통합할지 고민

  /********************************/
  /*         DM controller        */
  /********************************/

  @Post(':roomId/dm/participants')
  @ApiOperation({ summary: 'DM 참여자 추가' })
  @ApiCreatedResponse({
    description: 'DM 참여자 추가 성공',
    type: [UserDto],
  })
  addDmParticipants(
    @Param('roomId') roomId: number,
    @Body() addParticipantsDto: AddParticipantsDto,
  ) {
    return this.roomService.addDmParticipants(roomId, addParticipantsDto);
  }

  @Get('/:roomId/dm/participants')
  @ApiOperation({ summary: 'DM 참여자 목록' })
  @ApiOkResponse({
    description: 'DM 참여자 목록 가져오기 성공',
    type: [UserDto],
  })
  getDmParticipants(@Param('roomId') roomId: number) {
    return this.roomService.getDmParticipants(roomId);
  }

  @Delete('/:roomId/dm/participants/:userId')
  @ApiOperation({ summary: 'DM 참여자 삭제' })
  @ApiOkResponse({ description: 'DM 참여자 삭제 성공' })
  deleteDmParticipant(
    @Param('roomId') roomId: number,
    @Param('userId') userId: number,
  ) {
    this.logger.log('deleteDmParticipant');
    return this.roomService.deleteDmParticipant(roomId, userId);
  }
}
