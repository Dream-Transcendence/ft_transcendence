import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const CHAT_TYPE = {
  DM: 0,
  public: 1,
  protected: 2,
  private: 3,
} as const;
type CHAT_TYPE = typeof CHAT_TYPE[keyof typeof CHAT_TYPE];
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
