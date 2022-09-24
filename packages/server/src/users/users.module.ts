import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UserService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UserService, ...usersProviders],
})
export class UsersModule {}
