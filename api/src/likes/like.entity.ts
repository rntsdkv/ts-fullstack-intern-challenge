import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  cat_id: string;

  @Column({ nullable: false })
  user_login: string;

  @Column()
  created_at: Date;
}
