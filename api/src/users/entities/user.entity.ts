import { Entity, PrimaryColumn, Column } from 'typeorm';
import {IsNotEmpty} from "class-validator";

@Entity()
export class User {
  @PrimaryColumn()
  @IsNotEmpty()
  login: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  password: string;
}
