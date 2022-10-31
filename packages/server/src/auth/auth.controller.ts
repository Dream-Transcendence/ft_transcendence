import {
  Controller,
  Get,
  Header,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserIdDto } from '../users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('logout')
  @ApiTags('로그아웃')
  @Header('Set-Cookie', 'Authentication=; Path=/; HttpOnly; Max-Age=0')
  @ApiOperation({ summary: '로그아웃 요청' })
  logout() {
    return { message: '로그아웃 되었습니다.' };
  }

  @UseGuards(AuthGuard('bakingKim'))
  @Get('login')
  @ApiTags('로그인')
  @ApiOperation({ summary: '로그인 요청' })
  login(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('bakingKim'))
  @Get('bakingkim-redirect')
  @ApiTags('로그인')
  @ApiOperation({ summary: '로그인 후 토큰 제공' })
  @ApiOkResponse({
    description: '로그인 성공 type: [UserDto]',
    type: [UserIdDto],
  })
  async bakingKimAuthRedirect(@Request() req, @Res({ passthrough: true }) res) {
    // passthrough : 응답을 보내기 위한 옵션
    await this.authService.createJwtToken(req.user, res);
  }
}
