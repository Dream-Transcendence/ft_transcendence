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
import { AuthUserDto } from './dto/auth-user.dto';

import { CreateUserDto } from './dto/create-user.dto';
import {
  PatchUserImageURLDto,
  PatchUserNicknameDto,
} from './dto/patch-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './users.entity';
import { UserService } from './users.service';

@ApiTags('user')
@Controller('users')
export class UsersController {
  private logger = new Logger('UsersController');
  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '유저 등록' })
  @ApiCreatedResponse({
    description: 'Add user successfully',
    type: UserDto,
  })
  addUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    this.logger.log(`addUser: ${JSON.stringify(createUserDto)}`);
    return this.userService.addUser(createUserDto);
  }

  @Get('/:id')
  @ApiOperation({ summary: '유저 정보 가져오기' })
  @ApiOkResponse({ description: '유저 정보 가져오기 성공', type: UserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getUser(@Param('id') id: number): Promise<UserDto> {
    return;
  }

  @Patch('/:id/2nd-auth')
  @ApiOperation({ summary: '2차 인증 업데이트' })
  @ApiOkResponse({ description: '2차 인증 업데이트 성공', type: AuthUserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  patchAuthentication(@Param('id') id: number) {
    return;
  }

  @Get('/:id/2nd-auth')
  @ApiOperation({ summary: '2차 인증 여부 가져오기' })
  @ApiOkResponse({ description: '2차 인증 가져오기 성공', type: AuthUserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getAuthentication(@Param('id') id: number): Promise<boolean> {
    return;
  }

  @Post('/:id/blocks')
  @ApiOperation({ summary: '유저 차단' })
  @ApiCreatedResponse({ description: '유저 차단 성공' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  blockUser(@Param('id') id: number) {
    return;
  }

  @Get('/:id/blocks')
  @ApiOperation({ summary: '유저 차단 목록 가져오기' })
  @ApiOkResponse({ description: '유저 차단 목록 가져오기 성공', type: [User] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getBlocks(@Param('id') id: number): Promise<User[]> {
    return;
  }

  @Get('/:id/channels')
  @ApiOperation({ summary: '유저의 채널 목록 가져오기' })
  @ApiOkResponse({
    description: '유저의 채널 목록 가져오기 성공',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getChannels(@Param('id') id: number): Promise<any[]> {
    return;
  }

  @Get('/:id/dms')
  @ApiOperation({ summary: '유저의 DM 목록 가져오기' })
  @ApiOkResponse({ description: '유저의 DM 목록 가져오기 성공' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getDMs(@Param('id') id: number): Promise<any[]> {
    return;
  }

  @Post('/:id/friends')
  @ApiOperation({ summary: '친구 추가' })
  @ApiCreatedResponse({ description: '친구 추가 성공' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  addFriend(@Param('id') id: number) {
    return;
  }

  @Get('/:id/friends')
  @ApiOperation({ summary: '유저 친구 목록 가져오기' })
  @ApiCreatedResponse({
    description: '유저 친구 목록 가져오기 성공',
    type: [User],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getFriends(@Param('id') id: number): Promise<User[]> {
    return;
  }

  @Get('/:id/game/ladder')
  @ApiOperation({ summary: '유저의 래더 정보 가져오기' })
  @ApiOkResponse({ description: '유저 래더 정보 가져오기 성공' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getLadderStat(@Param('id') id: number): Promise<any> {
    return;
  }

  @Get('/:id/game/records')
  @ApiOperation({ summary: '유저의 게임 기록 가져오기' })
  @ApiOkResponse({ description: '유저 게임 기록 가져오기 성공' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getGameRecords(@Param('id') id: number): Promise<any[]> {
    return;
  }

  @Post('/:id/game/records')
  @ApiOperation({ summary: '유저의 게임 기록 추가' })
  @ApiCreatedResponse({ description: '유저 게임 기록 추가 성공' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  addGameRecord(@Param('id') id: number): Promise<any> {
    return;
  }

  @Patch('/:id/image')
  @ApiOperation({ summary: '유저 프로필 이미지 수정' })
  @ApiOkResponse({ description: '유저 프로필 이미지 수정 성공' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  patchUserImageURL(
    @Param('id') id: number,
    @Body() patchUserImageURLDto: PatchUserImageURLDto,
  ): Promise<UserDto> {
    return;
  }

  @Patch('/:id/nickname')
  @ApiOperation({ summary: '유저 닉네임 수정' })
  @ApiOkResponse({ description: '유저 닉네임 수정 성공' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  patchUserNickname(
    @Param('id') id: number,
    @Body() patchUserNicknameDto: PatchUserNicknameDto,
  ): Promise<UserDto> {
    return;
  }

  @Post('/:id/requests')
  @ApiOperation({ summary: '친구 요청 추가' })
  @ApiCreatedResponse({ description: '친구 요청 추가 성공' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  addRequest(@Param('id') id: number): Promise<UserDto> {
    return;
  }

  @Get('/:id/requests')
  @ApiOperation({ summary: '친구 요청 목록 가져오기' })
  @ApiOkResponse({ description: '친구 요청 목록 가져오기 성공' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getRequests(@Param('id') id: number): Promise<User[]> {
    return;
  }

  @Get('/:id/search')
  @ApiOperation({ summary: '유저 검색' })
  @ApiOkResponse({ description: '유저 검색 성공' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  searchUser(@Query('nickname') nickname: string): Promise<User[]> {
    return;
  }

  @Get('/:id/friends/search')
  @ApiOperation({ summary: '친구 검색' })
  @ApiOkResponse({ description: '친구 검색 성공' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  searchFriend(@Query('nickname') nickname: string): Promise<User[]> {
    return;
  }
}
