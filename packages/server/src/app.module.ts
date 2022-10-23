import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RoomModule } from './chats/rooms.module';
import { GameModule } from './game/game.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    RoomModule,
    GameModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    AuthModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: process.env.EMAIL_AUTH_ID,
            pass: process.env.EMAIL_AUTH_PASSWORD,
          },
        },
        defaults: {
          from: '"no-reply" <no-reply@transcendence.com>',
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [],
})
export class AppModule {}
