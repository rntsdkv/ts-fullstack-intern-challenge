import { Entity, Column } from 'typeorm';

@Entity()
export class Like {
  @Column({ nullable: false })
  cat_id: number;

  @Column({ nullable: false })
  user_login: string;

  @Column()
  created_at: Date;
}
