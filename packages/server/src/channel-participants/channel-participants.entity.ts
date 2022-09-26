import { isErrored } from 'stream';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AUTH_TYPE, STATUS_TYPE } from '../chats/dto/rooms.dto';
import { User } from '../users/users.entity';
import { Room } from '../chats/rooms.entity';

@Entity()
export class ChannelParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  auth: AUTH_TYPE;

  @Column()
  status: STATUS_TYPE;

  @Column()
  statusStartDate: Date;

  // @ManyToOne(() => User)
  // user: User;

  // @ManyToOne(() => Room, (room) => room.channelParticipants)
  // room: Room;
}
