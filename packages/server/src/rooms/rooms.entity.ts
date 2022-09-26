import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CHAT_TYPE } from './dto/rooms.dto';
import { ChannelParticipant } from '../channel-participants/channel-participants.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: CHAT_TYPE;

  @Column()
  salt: string;

  @Column()
  title: string;

  @Column()
  image: string;

  @OneToMany(
    () => ChannelParticipant,
    (channelParticipant) => channelParticipant.room,
  )
  channelParticipants: ChannelParticipant[];
}
