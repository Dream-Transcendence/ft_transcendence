import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { AuthService } from './auth.service';

@Injectable()
export class bakingKimStrategy extends PassportStrategy(Strategy, 'bakingKim') {
  constructor(private authService: AuthService) {
    super({
      authorizationURL:
        'https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-1164d92757902b5755ab47047488f33b986969c96c58a252eb1a6f8344bdf8ad&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2FbakingKim-redirect&response_type=code',
      tokenURL: 'https://api.intra.42.fr/oauth/token',
      clientID:
        'u-s4t2ud-1164d92757902b5755ab47047488f33b986969c96c58a252eb1a6f8344bdf8ad',
      clientSecret:
        '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',
      callbackURL: 'http://localhost:3000/auth/bakingkim-redirect',
    });
  }
  async validate(accessToken: string, refreshToken: string) {
    console.log('accessToken: ', accessToken);
    console.log('refreshToken: ', refreshToken);
    const result = await this.authService.validateUser(accessToken);
    if (!result) throw new UnauthorizedException('Unauthorized');
    return result;
  }
}
