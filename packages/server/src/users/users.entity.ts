import {
  ChannelParticipant,
  DmParticipant,
  Message,
} from '../chats/rooms.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  constructor(nickname: string, image: string) {
    super();
    this.nickname = nickname;
    this.image = image;
  }

  //TODO: 42API 제공 id를 사용하기 때문에, 추후 PrimaryColumn()으로 수정
  // @PrimaryGeneratedColumn({ type: 'int' })
  @PrimaryColumn()
  id: number;

  @Column({ unique: true })
  nickname: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Block, (block) => block.user)
  blocks: Block[];

  @OneToMany(() => Friend, (friend) => friend.user)
  friends: Friend[];

  @OneToMany(
    () => ChannelParticipant,
    (channelParticipant) => channelParticipant.user,
  )
  channelParticipants: ChannelParticipant[];

  @OneToMany(() => DmParticipant, (dmParticipant) => dmParticipant.user)
  dmParticipants: DmParticipant[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];
}

@Entity()
@Unique(['user', 'blockedUser'])
export class Block extends BaseEntity {
  // @PrimaryGeneratedColumn()
  @PrimaryColumn()
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
  @PrimaryColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  authenticated: boolean;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}

@Entity()
@Unique(['user', 'friend'])
export class Friend extends BaseEntity {
  // @PrimaryGeneratedColumn()
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.friends)
  user: User;

  @ManyToOne(() => User, (user) => user.friends)
  friend: User;
}

@Entity()
@Unique(['requestor', 'responser'])
export class Request extends BaseEntity {
  // @PrimaryGeneratedColumn()
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.friends)
  requestor: User;

  @ManyToOne(() => User, (user) => user.friends)
  responser: User;
}
