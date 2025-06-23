import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  cat_id: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  cat_url: string;

  @Column({ nullable: false, select: false })
  user_login: string;

  @Column({ nullable: true })
  created_at: Date;
}
