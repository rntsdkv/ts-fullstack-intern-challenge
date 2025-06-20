import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  login: string;

  @Column({ nullable: false })
  password: string;
}
