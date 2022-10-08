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

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];
}

@Entity()
export class ChannelParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'integer' })
  auth: AUTH_TYPE;

  @Column({ nullable: true, type: 'integer' })
  status: STATUS_TYPE;

  @Column({ nullable: true, type: 'timestamp' })
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

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  body: string;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;

  @ManyToOne(() => Room, (room) => room.messages)
  room: Room;
}
