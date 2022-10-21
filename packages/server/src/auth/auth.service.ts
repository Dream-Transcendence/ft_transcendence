import { ForbiddenException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../users/users.service';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(accessToken: string) {
    console.log('validateUser function');
    const response = await firstValueFrom(
      this.httpService.get('https://api.intra.42.fr/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    ).catch(function (error) {
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        throw new ForbiddenException(
          '사용자의 토큰이 만료되었거나 유효하지 않습니다.',
        );
      }
    });
    if (response) {
      console.log(response.data.id);
      let user = await this.userService.getUser(response.data.id);
      if (user) {
        return { ...user, isMember: true };
      } else {
        user = await this.userService.addUser({
          id: response.data.id,
          nickname: uuidv4(),
          image: response.data.image.link,
          email: response.data.email,
        });
        return { ...user, isMember: false };
      }
    }
    return null;
  }

  async createJwtToken(user: any, res: any) {
    const payload = { username: user.nickname, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    res.cookie('Authentication', access_token, {
      domain: 'localhost', // 현재 쿠키가 어떤 서버로 전송되어져야 하는지를 지정할 수 있는 속성
      path: '/', // 모든 경로에 대해 쿠키전달
      httpOnly: true, // XSS와 같은 공격이 차단
    });
    console.log('🥎🥎🥎🥎🥎🥎🥎🥎 우리가 만든 jwt token ', access_token);
    res.redirect(`http://localhost:3005/nickname`);
  }
}
