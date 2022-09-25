import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  constructor(id: number, nickname: string, image: string) {
    super();
    this.id = id;
    this.nickname = nickname;
    this.image = image;
  }

  //TODO: 42API 제공 id를 사용하기 때문에, 추후 PrimaryColumn()으로 수정
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  image: string;

  @OneToMany(() => Block, (block) => block.user)
  blocks: Block[];
}

@Entity()
export class Block extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  blockedTime: Date;

  @ManyToOne(() => User, (user) => user.blocks)
  user: User;

  @ManyToOne(() => User, (user) => user.blocks)
  blockedUser: User;
}

@Entity()
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  authenticated: boolean;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
