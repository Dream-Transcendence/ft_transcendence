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
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateChannelDto,
  ChannelParticipantDto,
  ChannelDto,
  PatchChannelInfoDto,
  PatchUserInfoDto,
  CreateDmDto,
  RoomPasswordDto,
} from './dto/rooms.dto';
import { RoomService } from './rooms.service';
import { DmUserDto } from '../users/dto/user.dto';

@ApiTags('room')
@Controller('rooms')
export class RoomsController {
  private logger = new Logger('RoomsController');
  constructor(private roomService: RoomService) {}

  // ANCHOR Channel Controller

  @Post('/channels')
  @ApiOperation({ summary: '채널 생성 BodyType: CreateChannelDto' })
  @ApiCreatedResponse({
    description: '채널 생성 성공 type: ChannelDto',
    type: ChannelDto,
  })
  @ApiNotFoundResponse({ description: '채널 참여자를 찾을 수 없습니다' })
  createChannel(
    @Body() createChannelDto: CreateChannelDto,
  ): Promise<ChannelDto> {
    this.logger.log(`createRoom: ${JSON.stringify(createChannelDto)}`);
    return this.roomService.createChannel(createChannelDto);
  }

  @Get('/:userId/channels')
  @ApiOperation({ summary: '공개, 보호 채널 목록' })
  @ApiOkResponse({
    description: '공개, 보호 채널 목록 가져오기 성공 type: [ChannelDto]',
    type: [ChannelDto],
  })
  getChannels(@Param('userId') userId: number): Promise<ChannelDto[]> {
    this.logger.log(`getChannels`);
    return this.roomService.getChannels(userId);
  }

  @Get('/channel/:roomId/:userId')
  @ApiOperation({ summary: '채팅방 정보 가져오기' })
  @ApiOkResponse({
    description: '채팅방 정보 가져오기 성공 type: ChannelDto',
    type: ChannelDto,
  })
  @ApiNotFoundResponse({ description: '방 혹은 user를 찾을 수 없습니다' })
  getChannelInfo(
    @Param('roomId') roomId: number,
    @Param('userId') userId: number,
  ): Promise<ChannelDto> {
    this.logger.log(`getRoomInfo`);
    return this.roomService.getChannelInfo(roomId, userId);
  }

  @Post('/:roomId/users/:userId')
  @ApiOperation({ summary: '채팅방 입장 BodyType: RoomPasswordDto' })
  @ApiOkResponse({ description: '채팅방 입장 성공' })
  @ApiNotFoundResponse({ description: '방 혹은 user를 찾을 수 없습니다' })
  @ApiForbiddenResponse({ description: '비밀번호가 맞지 않습니다' })
  enterChannel(
    @Param('roomId') roomId: number,
    @Param('userId') userId: number,
    @Body() roomPasswordDto: RoomPasswordDto,
  ) {
    // NOTE 비밀번호가 없을 때는 빈 객체 혹은 null을 보내기
    return this.roomService.enterChannel(roomId, userId, roomPasswordDto);
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
  @ApiNotFoundResponse({ description: '채널 참여자를 찾을 수 없습니다' })
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
  @ApiOperation({
    summary:
      '체팅방 정보 수정(비밀번호 지우고 싶을 때 null으로 보내면 됩니다) | BodyType: PatchChannelInfoDto',
  })
  @ApiOkResponse({ description: '체팅방 정보 수정 성공' })
  patchChannelInfo(
    @Param('roomId') roomId: number,
    @Body() patchChannelInfoDto: PatchChannelInfoDto,
  ) {
    this.logger.log('patchChannelInfo');
    return this.roomService.patchChannelInfo(roomId, patchChannelInfoDto);
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
    description: 'DM 채널 생성 type: DmDto',
  })
  @ApiNotFoundResponse({ description: 'DM 참여자를 찾을 수 없습니다' })
  createDm(@Body() createDmDto: CreateDmDto) {
    return this.roomService.createDm(createDmDto);
  }

  @Get('/:roomId/dm/:userId/participants')
  @ApiOperation({ summary: 'DM 참여자 목록' })
  @ApiOkResponse({
    description: 'DM 참여자 목록 가져오기 성공 type: DmUserDto',
    type: DmUserDto,
  })
  getDmParticipant(
    @Param('roomId') roomId: number,
    @Param('userId') userId: number,
  ) {
    return this.roomService.getDmParticipant(roomId, userId);
  }
}
