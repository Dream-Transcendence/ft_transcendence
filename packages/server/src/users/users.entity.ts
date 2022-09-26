import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChannelParticipant } from '../channel-participants/channel-participants.entity';

@Entity()
export class User extends BaseEntity {
  constructor(id: number, nickname: string, imageURL: string) {
    super();
    this.id = id;
    this.nickname = nickname;
    this.imageURL = imageURL;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  imageURL: string;

  @OneToMany(
    () => ChannelParticipant,
    (channelParticipant) => channelParticipant.user,
  )
  channelParticipants: ChannelParticipant[];
}
