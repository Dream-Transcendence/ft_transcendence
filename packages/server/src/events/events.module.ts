import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { RoomModule } from '../chats/rooms.module';

@Module({
  imports: [RoomModule],
  providers: [EventsGateway],
})
export class EventsModule {}
