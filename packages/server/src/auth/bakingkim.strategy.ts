import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-42';

@Injectable()
export class bakingKimStrategy extends PassportStrategy(Strategy, 'bakingKim') {
  constructor(private authService: AuthService) {
    super({
      clientID:
        'u-s4t2ud-f3eab15507a41e38502ac765bde30fd098809f2d1fdb388ccb5dbea28384362b',
      clientSecret:
        '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',
      callbackURL: 'http://localhost:3000/auth/bakingkim-redirect',
    });
  }
  async validate(accessToken: string, refreshToken: string) {
    const result = await this.authService.validateUser(accessToken);
    if (!result) throw new UnauthorizedException('Unauthorized');
    return result;
  }
}
