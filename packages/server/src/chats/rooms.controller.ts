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
  CreateChannelDto,
  RoomPasswordDto,
  PatchRoomInfoDto,
  PatchUserInfoDto,
  createDmDto,
} from './dto/rooms.dto';
import { RoomService } from './rooms.service';
import { UserDto } from '../users/dto/user.dto';

@ApiTags('room')
@Controller('rooms')
export class RoomsController {
  private logger = new Logger('RoomsController');
  constructor(private roomService: RoomService) {}

  // ANCHOR Channel Controller

  @Post('/channels')
  @ApiOperation({ summary: '채널 생성 BodyType: CreateChannelDto' })
  @ApiCreatedResponse({
    description: '채널 생성 성공 type: RoomDto',
    type: RoomDto,
  })
  createChannel(@Body() createChannelDto: CreateChannelDto): Promise<RoomDto> {
    this.logger.log(`createRoom: ${JSON.stringify(createChannelDto)}`);
    return this.roomService.createChannel(createChannelDto);
  }

  @Get('/channels')
  @ApiOperation({ summary: '공개, 보호 채널 목록' })
  @ApiOkResponse({
    description: '공개, 보호 채널 목록 가져오기 성공 type: [RoomDto]',
    type: [RoomDto],
  })
  // TODO: return값에 salt삭제 고민
  getChannels(): Promise<RoomDto[]> {
    this.logger.log(`getChannels`);
    return this.roomService.getChannels();
  }

  // NOTE user controller로 옮기기
  // @Get('/:userId/chats')
  // @ApiOperation({ summary: 'user의 채널, DM 목록' })
  // @ApiOkResponse({
  //   description: 'user의 채널, DM 목록 가져오기 성공 type: GetUserChatsDto',
  //   type: GetUserChatsDto,
  // })
  // getUserChats(@Param('userId') userId: number): Promise<GetUserChatsDto> {
  //   this.logger.log(`getUserChats`);
  //   return this.roomService.getUserChats(userId);
  // }

  @Get('/channel/:roomId')
  @ApiOperation({ summary: '채팅방 정보 가져오기' })
  @ApiOkResponse({
    description: '채팅방 정보 가져오기 성공 type: RoomDto',
    type: RoomDto,
  })
  getRoomInfo(@Param('roomId') roomId: number): Promise<RoomDto> {
    this.logger.log(`getRoomInfo`);
    return this.roomService.getRoomInfo(roomId);
  }

  @Post('/:roomId/users/:userId')
  @ApiOperation({ summary: '채팅방 입장 BodyType: RoomPasswordDto' })
  @ApiOkResponse({
    description: '채팅방 입장 성공 type: UserDto',
    type: UserDto,
  })
  enterRoom(
    @Param('roomId') roomId: number,
    @Param('userId') userId: number,
    @Body() roomPasswordDto: RoomPasswordDto,
  ): Promise<UserDto> {
    // NOTE 비밀번호가 없을 때는 빈 객체를 보내기
    return this.roomService.enterRoom(roomId, userId, roomPasswordDto);
  }

  @Get('/:roomId/channel/:userId/participants')
  // FIXME[epic=sonkang] userId를 body에 넣으려고 했으나 'addChannelParticipants' 주소와 같게 됨. 고민해보기
  @ApiOperation({ summary: '채널 참여자 목록' })
  @ApiOkResponse({
    description: '채널 참여자 목록 가져오기 성공 type: [ChannelParticipantDto]',
    type: [ChannelParticipantDto],
  })
  getChannelParticipants(
    @Param('userId') userId: number,
    @Param('roomId') roomId: number,
  ): Promise<ChannelParticipantDto[]> {
    this.logger.log('getChannelParticipants');
    return this.roomService.getChannelParticipants(userId, roomId);
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

  @Patch('/:roomId')
  @ApiOperation({ summary: '체팅방 정보 수정 BodyType: PatchRoomInfoDto' })
  @ApiOkResponse({ description: '체팅방 정보 수정 성공' })
  patchRoomInfo(
    @Param('roomId') roomId: number,
    @Body() patchRoomInfoDto: PatchRoomInfoDto,
  ) {
    this.logger.log('patchRoomInfo');
    return this.roomService.patchRoomInfo(roomId, patchRoomInfoDto);
  }

  @Patch('/:roomId/users/:userId')
  @ApiOperation({
    summary: '채팅 유저 권한, 상태 변경 BodyType: PatchUserInfoDto',
  })
  @ApiOkResponse({ description: '채팅 유저 권한, 상태 변경 성공' })
  patchUserInfo(
    @Param('roomId') roomId: number,
    @Param('userId') userId: number,
    @Body() patchUserInfoDto: PatchUserInfoDto,
  ) {
    this.logger.log('patchUserAuth');
    return this.roomService.patchUserInfo(roomId, userId, patchUserInfoDto);
  }

  // ANCHOR DM Controller
  @Post('/dm')
  @ApiOperation({ summary: 'DM 채널 생성 BodyType: createDmDto' })
  @ApiCreatedResponse({
    description: 'DM 채널 생성 type: [UserDto]',
    type: [UserDto],
  })
  createDm(@Body() createDmDto: createDmDto) {
    return this.roomService.createDm(createDmDto);
  }

  @Get('/:roomId/dm/participants')
  @ApiOperation({ summary: 'DM 참여자 목록' })
  @ApiOkResponse({
    description: 'DM 참여자 목록 가져오기 성공 type: [UserDto]',
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
