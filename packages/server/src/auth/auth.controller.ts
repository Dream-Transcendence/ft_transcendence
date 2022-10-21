import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@UseGuards(AuthGuard('bakingKim'))
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  login(@Request() req) {
    return req.user;
  }

  @Get('bakingkim-redirect')
  async bakingKimAuthRedirect(@Request() req, @Res({ passthrough: true }) res) {
    // passthrough : 응답을 보내기 위한 옵션
    this.authService.createJwtToken(req.user, res);
    return { isMember: req.user.isMember };
  }
}
