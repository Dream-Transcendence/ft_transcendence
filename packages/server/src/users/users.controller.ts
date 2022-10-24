import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetUserRoomsDto } from 'src/chats/dto/rooms.dto';
import { GameLadderDto, GameRecordDto } from 'src/game/game.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PatchImageDto, PatchNicknameDto } from './dto/patch-user.dto';
import {
  FriendDto,
  PatchAuthDto,
  ServerRequestDto,
  UserDto,
  UserIdDto,
} from './dto/user.dto';
import { UserService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
// @UseGuards(AuthGuard('jwt'))
export class UsersController {
  private logger = new Logger('UsersController');
  constructor(private userService: UserService) {}

  @Post()
  @ApiTags('유저/관리')
  @ApiOperation({
    summary: '유저 등록 / BodyType: CreateUserDto',
    description: '로그인 로직에 유저 추가가 들어갈 경우, 삭제될 수 있음',
  })
  @ApiCreatedResponse({
    description: 'Add user  successfully',
    type: UserDto,
  })
  addUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.addUser(createUserDto);
  }

  @Get('/:id/profile')
  @ApiTags('유저/관리')
  @ApiOperation({
    summary: '유저 정보 가져오기',
    description:
      'UserID를 입력하여 유저 정보 확인(프로필이 들어간 부분(배너, 프로필 창 등))',
  })
  @ApiOkResponse({ description: '유저 정보 가져오기 성공', type: UserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getUser(@Param('id') id: number): Promise<UserDto> {
    return this.userService.getUser(id);
  }

  @Patch('/:id/image')
  @ApiTags('유저 관리')
  @ApiOperation({
    summary: '유저 이미지 수정 / BodyType: File',
    description: '유저 이미지 업데이트',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    description: 'User profile image',
    type: PatchImageDto,
  })
  @ApiOkResponse({ description: '유저 이미지 수정 성공', type: UserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  patchImage(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.patchImage(id, file);
  }

  @Patch('/:id/nickname')
  @ApiTags('유저 관리')
  @ApiOperation({
    summary: '유저 닉네임 수정  / BodyType: PatchNicknameDto',
    description: '닉네임 업데이트',
  })
  @ApiOkResponse({ description: '유저 닉네임 수정 성공', type: UserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiConflictResponse({ description: '이미 있는 닉네임으로 변경 시도' })
  patchNickname(
    @Param('id') id: number,
    @Body()
    patchNicknameDto: PatchNicknameDto,
  ): Promise<UserDto> {
    return this.userService.patchNickname(id, patchNicknameDto);
  }

  @Get('/:id/2nd-auth')
  @ApiTags('유저/관리')
  @ApiOperation({
    summary: '2차 인증 여부 가져오기',
    description: '유저의 2차 인증 여부를 Boolean(true, false)으로 확인',
  })
  @ApiOkResponse({ description: '2차 인증 가져오기 성공', type: AuthUserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getAuth(@Param('id') id: number): Promise<AuthUserDto> {
    return this.userService.getAuth(id);
  }

  @Patch('/:id/2nd-auth')
  @ApiTags('유저/관리')
  @ApiOperation({
    summary: '2차 인증 업데이트 / BodyType: AuthUserDto',
    description:
      '유저의 2차 인증 여부 반전(true -> false, false -> true)\
      인증을 할 때는 이메일로 받은 code를 body에 포함하고, 해제 할 때는 바디에 아무것도 포함하지 않음',
  })
  @ApiOkResponse({ description: '2차 인증 업데이트 성공', type: AuthUserDto })
  @ApiBadRequestResponse({
    description: '인증코드가 일치하지 않거나 만료되었습니다.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  patchAuth(@Param('id') id: number, @Body() patchAuthDto: PatchAuthDto) {
    return this.userService.patchAuth(id, patchAuthDto);
  }

  @Post('/:id/blocks')
  @ApiTags('유저/차단')
  @ApiOperation({
    summary: '유저 차단 / BodyType: UserIdDto',
    description: 'User ID 객체를 바디에 담아 요청하면 해당 유저 차단',
  })
  @ApiCreatedResponse({ description: '유저 차단 성공', type: UserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  blockUser(
    @Param('id') id: number,
    @Body() userIdDto: UserIdDto,
  ): Promise<UserDto> {
    return this.userService.blockUser(id, userIdDto.id);
  }

  @Delete('/:id/blocks/:blockedUserId')
  @ApiTags('유저/차단')
  @ApiOperation({
    summary: '유저 차단 해제 / BodyType: UserIdDto',
    description: 'URL이 가르키는 유저 차단 해제',
  })
  @ApiOkResponse({ description: '유저 차단 해제 성공', type: UserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  unblockUser(
    @Param('id') id: number,
    @Param('blockedUserId') blockedUserId: number,
  ): Promise<UserDto> {
    return this.userService.unblockUser(id, blockedUserId);
  }

  @Get('/:id/rooms')
  @ApiTags('유저/채팅')
  @ApiOperation({
    summary: '유저의 대화방 목록 가져오기',
    description: '유저가 속한 모든 채팅방을 DM, CHAT으로 구분하여 반환',
  })
  @ApiOkResponse({
    description: '유저의 대화방 목록 가져오기 성공',
    type: GetUserRoomsDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getRooms(@Param('id') id: number): Promise<GetUserRoomsDto> {
    return this.userService.getRooms(id);
  }

  @Post('/:id/friends')
  @ApiTags('유저/친구')
  @ApiOperation({
    summary: '친구 추가 / BodyType: UserIdDto',
    description:
      'Body에 UserId가 들어간 객체를 넘기면 해당 ID의 유저를 친구로 추가\n\n 친구요청 수락 버튼을 눌렀을 때 호출',
  })
  @ApiCreatedResponse({ description: '친구 추가 성공', type: UserDto })
  @ApiNotFoundResponse({ description: 'Friend Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  addFriend(
    @Param('id') id: number,
    @Body() friendIdDto: UserIdDto,
  ): Promise<UserDto> {
    return this.userService.addFriend(id, friendIdDto.id);
  }

  @Get(':id/friends/:friendId')
  @ApiTags('유저/친구')
  @ApiOperation({ summary: '친구 정보 확인' })
  @ApiOkResponse({ description: '친구 정보 확인 성공', type: UserDto })
  @ApiNotFoundResponse({ description: 'Friend Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getFriend(@Param('id') id: number, @Param('friendId') friendId: number) {
    return this.userService.getFriend(id, friendId);
  }

  @Get('/:id/friends')
  @ApiTags('유저/친구')
  @ApiOperation({ summary: '유저 친구 목록 가져오기' })
  @ApiCreatedResponse({
    description: '유저 친구 목록 가져오기 성공',
    type: [FriendDto],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getFriends(@Param('id') id: number): Promise<FriendDto[]> {
    return this.userService.getFriends(id);
  }

  //TODO: Game 관련 요청 추후 처리
  @Get('/:id/game/ladder')
  @ApiTags('유저/게임')
  @ApiOperation({ summary: '유저의 래더 정보 가져오기' })
  @ApiOkResponse({
    description: '유저 래더 정보 가져오기 성공',
    type: GameLadderDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getLadderStat(@Param('id') id: number): Promise<GameLadderDto> {
    return;
  }

  @Post('/:id/game/records')
  @ApiTags('유저/게임')
  @ApiOperation({ summary: '유저의 게임 기록 추가' })
  @ApiCreatedResponse({
    description: '유저 게임 기록 추가 성공',
    type: GameRecordDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  addGameRecord(@Param('id') id: number): Promise<GameRecordDto> {
    return;
  }

  @Get('/:id/game/records')
  @ApiTags('유저/게임')
  @ApiOperation({ summary: '유저의 게임 기록 가져오기' })
  @ApiOkResponse({
    description: '유저 게임 기록 가져오기 성공',
    type: [GameRecordDto],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getGameRecords(@Param('id') id: number): Promise<GameRecordDto[]> {
    return;
  }

  @Post('/:id/requests')
  @ApiTags('유저/친구')
  @ApiOperation({ summary: '친구 요청 추가 / BodyType: UserIdDto' })
  @ApiCreatedResponse({ description: '친구 요청 추가 성공' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Friend Not Found' })
  @ApiConflictResponse({ description: 'Already Friend or Requested' })
  addRequest(
    @Param('id') id: number,
    @Body() responserIdDto: UserIdDto,
  ): Promise<UserDto> {
    return this.userService.addRequest(id, responserIdDto.id);
  }

  @Get('/:id/requests')
  @ApiTags('유저/친구')
  @ApiOperation({ summary: '친구 요청 목록 가져오기' })
  @ApiOkResponse({
    description: '친구 요청 목록 가져오기 성공',
    type: [ServerRequestDto],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getRequests(@Param('id') id: number): Promise<ServerRequestDto[]> {
    return this.userService.getRequests(id);
  }

  @Get('/search')
  @ApiQuery({ name: 'nickname', required: true })
  @ApiTags('유저/검색')
  @ApiOperation({ summary: '유저 검색' })
  @ApiOkResponse({ description: '유저 검색 성공', type: [UserDto] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  searchUser(@Query('nickname') nickname: string): Promise<UserDto[]> {
    return this.userService.searchUser(nickname);
  }

  @Get('/:id/friends/search')
  @ApiTags('유저/검색')
  @ApiQuery({ name: 'nickname', required: true })
  @ApiOperation({ summary: '친구 검색' })
  @ApiOkResponse({ description: '친구 검색 성공', type: [UserDto] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  searchFriend(
    @Param('id') id: number,
    @Query('nickname') nickname: string,
  ): Promise<UserDto[]> {
    return this.userService.searchFriend(id, nickname);
  }

  @Post('/:id/2nd-auth')
  @ApiTags('유저/관리')
  @ApiOperation({ summary: '유저 2차 인증 요청' })
  @ApiCreatedResponse({ description: '유저 2차 인증 요청 성공' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  requestAuth(@Param('id') id: number) {
    return this.userService.requestAuth(id);
  }

  @ApiTags('유저/인증')
  @Get('userinfo')
  async userInfo(@Request() req) {
    return await this.userService.userInfo(req.user);
  }
}
