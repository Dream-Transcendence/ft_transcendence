import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  constructor(id: number, nickname: string, image: string) {
    super();
    this.id = id;
    this.nickname = nickname;
    this.image = image;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  image: string;
}
