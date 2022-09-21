import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
