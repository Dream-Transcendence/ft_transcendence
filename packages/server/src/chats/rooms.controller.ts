import {
  Body,
  Controller,
  Get,
  Param,
  Logger,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
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
  CreateDmDto,
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

  @Get('/:roomId/messages')
  @ApiOperation({ summary: '채팅방 메시지 목록' })
  getMessages(@Param('roomId') roomId: number) {
    return this.roomService.getMessages(roomId);
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
