import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Any } from 'typeorm';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

// import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './users.entity';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  private logger = new Logger('UsersController');
  constructor(private userService: UserService) {}

  @Post()
  @ApiTags('유저 관리')
  @ApiOperation({ summary: '유저 등록' })
  @ApiCreatedResponse({
    description: 'Add user successfully',
    type: UserDto,
  })
  addUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    this.logger.log(`addUser: ${JSON.stringify(UserDto)}`);
    return this.userService.addUser(createUserDto);
  }

  @Get('/:id')
  @ApiTags('유저 관리')
  @ApiOperation({ summary: '유저 정보 가져오기' })
  @ApiOkResponse({ description: '유저 정보 가져오기 성공', type: UserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getUser(@Param('id') id: number): Promise<UserDto> {
    return this.userService.getUser(id);
  }

  @Patch('/:id')
  @ApiTags('유저 관리')
  @ApiOperation({ summary: '유저 정보 수정' })
  @ApiOkResponse({ description: '유저 정보 수정 성공' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  patchUser(
    @Param('id') id: number,
    @Body() userDto: UserDto,
  ): Promise<UserDto> {
    return this.userService.patchUser(id, userDto);
  }

  @Get('/:id/2nd-auth')
  @ApiTags('유저 관리')
  @ApiOperation({ summary: '2차 인증 여부 가져오기' })
  @ApiOkResponse({ description: '2차 인증 가져오기 성공', type: AuthUserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getAuth(@Param('id') id: number): Promise<AuthUserDto> {
    return this.userService.getAuth(id);
  }

  @Patch('/:id/2nd-auth')
  @ApiTags('유저 관리')
  @ApiOperation({ summary: '2차 인증 업데이트' })
  @ApiOkResponse({ description: '2차 인증 업데이트 성공', type: AuthUserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  patchAuth(@Param('id') id: number) {
    return this.userService.patchAuth(id);
  }

  @Post('/:id/blocks')
  @ApiTags('유저/차단')
  @ApiOperation({ summary: '유저 차단' })
  @ApiCreatedResponse({ description: '유저 차단 성공', type: UserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  blockUser(@Param('id') id: number, @Body() user: UserDto): Promise<UserDto> {
    return this.userService.blockUser(id, user.id);
  }

  @Get('/:id/blocks')
  @ApiTags('유저/차단')
  @ApiOperation({ summary: '유저 차단 목록 가져오기' })
  @ApiOkResponse({
    description: '유저 차단 목록 가져오기 성공',
    type: [UserDto],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getBlocks(@Param('id') id: number): Promise<UserDto[]> {
    return this.userService.getBlocks(id);
  }

  @Get('/:id/rooms')
  @ApiTags('유저/채팅')
  @ApiOperation({ summary: '유저의 대화방 목록 가져오기' })
  @ApiOkResponse({
    description: '유저의 대화방 목록 가져오기 성공',
    type: [Any],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getRooms(@Param('id') id: number): Promise<any[]> {
    return;
  }

  @Post('/:id/friends')
  @ApiTags('유저/친구')
  @ApiOperation({ summary: '친구 추가' })
  @ApiCreatedResponse({ description: '친구 추가 성공', type: UserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  addFriend(@Param('id') id: number, @Body() userId: number): Promise<UserDto> {
    return this.userService.addFriend(id, userId);
  }

  @Get('/:id/friends')
  @ApiTags('유저/친구')
  @ApiOperation({ summary: '유저 친구 목록 가져오기' })
  @ApiCreatedResponse({
    description: '유저 친구 목록 가져오기 성공',
    type: [User],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getFriends(@Param('id') id: number): Promise<UserDto[]> {
    return;
  }

  @Get('/:id/game/ladder')
  @ApiTags('유저/게임')
  @ApiOperation({ summary: '유저의 래더 정보 가져오기' })
  @ApiOkResponse({ description: '유저 래더 정보 가져오기 성공', type: [Any] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getLadderStat(@Param('id') id: number): Promise<any> {
    return;
  }

  @Post('/:id/game/records')
  @ApiTags('유저/게임')
  @ApiOperation({ summary: '유저의 게임 기록 추가' })
  @ApiCreatedResponse({ description: '유저 게임 기록 추가 성공', type: Any })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  addGameRecord(@Param('id') id: number): Promise<any> {
    return;
  }

  @Get('/:id/game/records')
  @ApiTags('유저/게임')
  @ApiOperation({ summary: '유저의 게임 기록 가져오기' })
  @ApiOkResponse({ description: '유저 게임 기록 가져오기 성공', type: [Any] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getGameRecords(@Param('id') id: number): Promise<any[]> {
    return;
  }

  @Post('/:id/requests')
  @ApiTags('유저/친구')
  @ApiOperation({ summary: '친구 요청 추가' })
  @ApiCreatedResponse({ description: '친구 요청 추가 성공' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  addRequest(@Param('id') id: number): Promise<UserDto> {
    return;
  }

  @Get('/:id/requests')
  @ApiTags('유저/친구')
  @ApiOperation({ summary: '친구 요청 목록 가져오기' })
  @ApiOkResponse({ description: '친구 요청 목록 가져오기 성공' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getRequests(@Param('id') id: number): Promise<User[]> {
    return;
  }

  @Get('/:id/search?nickname=:nickname')
  @ApiTags('유저/검색')
  @ApiOperation({ summary: '유저 검색' })
  @ApiOkResponse({ description: '유저 검색 성공' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  searchUser(@Query('nickname') nickname: string): Promise<User[]> {
    return;
  }

  @Get('/:id/friends/search?nickname=:nickname')
  @ApiTags('유저/검색')
  @ApiOperation({ summary: '친구 검색' })
  @ApiOkResponse({ description: '친구 검색 성공' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  searchFriend(@Query('nickname') nickname: string): Promise<User[]> {
    return;
  }
}
