import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AUTH_TYPE, CHAT_TYPE, STATUS_TYPE } from './dto/rooms.dto';
import { User } from '../users/users.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  type: CHAT_TYPE;

  @Column({ nullable: true })
  salt: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(
    () => ChannelParticipant,
    (channelParticipant) => channelParticipant.room,
  )
  channelParticipants: ChannelParticipant[];

  @OneToMany(() => DmParticipant, (dmParticipant) => dmParticipant.room)
  dmParticipants: DmParticipant[];
}

@Entity()
export class ChannelParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  auth: AUTH_TYPE;

  @Column({ nullable: true })
  status: STATUS_TYPE;

  @Column({ nullable: true })
  statusStartDate: Date;

  @ManyToOne(() => User, (user) => user.channelParticipants)
  user: User;

  @ManyToOne(() => Room, (room) => room.channelParticipants)
  room: Room;
}

@Entity()
export class DmParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.dmParticipants)
  user: User;

  @ManyToOne(() => Room, (room) => room.dmParticipants)
  room: Room;
}
