import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { WsException } from '@nestjs/websockets';
import { jwtConstants } from './constants';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { PayloadDto } from './auth.dto';

const cookieExtractor = (req) => {
  let jwt = null;
  if (req && req.cookies) {
    jwt = req.cookies['Authentication'];
  }
  return jwt;
};

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'wsjwt') {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {
    super({
      //   jwtFromRequest: ExtractJwt.fromUrlQueryParameter('bearerToken'),
      jwtFromRequest: cookieExtractor,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    await console.log('🐻🐻🐻🐻🐻🐻🐻🐻🐻🐻🐻🐻');
    console.log('🐻🐻🐻🐻🐻🐻🐻🐻🐻🐻🐻🐻 payload : ', payload);
    const { username, sub } = payload;
    try {
      return this.usersRepository.findOneByOrFail({ id: sub });
    } catch (error) {
      throw new WsException('Unauthorized access');
    }
  }
}
