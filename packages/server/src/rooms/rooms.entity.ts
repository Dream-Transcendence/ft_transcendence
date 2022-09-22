import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { CHAT_TYPE } from './dto/rooms.dto';

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
}
