import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { TypeOrmExModule } from '../config/db/typeorm-ex.module';
import { RoomRepository } from './rooms.repository';
import { RoomsService } from './rooms.service';
@Module({
  imports: [TypeOrmExModule.forCustomRepository([RoomRepository])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomModule {}
