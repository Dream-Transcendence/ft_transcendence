import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { bakingKimStrategy } from './bakingkim.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { UserService } from '../users/users.service';
import { usersProviders } from '../users/users.providers';
import { roomsProviders } from '../chats/rooms.providers';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    UsersModule,
    PassportModule,
    HttpModule,
    DatabaseModule,
    ConfigModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [
    AuthService,
    UserService,
    ...usersProviders,
    ...roomsProviders,
    bakingKimStrategy,
    JwtStrategy,
    JwtModule,
  ],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
