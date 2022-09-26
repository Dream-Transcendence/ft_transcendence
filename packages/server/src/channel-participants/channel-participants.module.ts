import { Module } from '@nestjs/common';
import { ChannelParticipantsController } from './channel-participants.controller';

@Module({
  controllers: [ChannelParticipantsController],
})
export class ChannelParticipantsModule {}
