import { IsNotEmpty } from 'class-validator';

export class CreateLikeDto {
  @IsNotEmpty()
  cat_id: string;

  @IsNotEmpty()
  cat_url: string;
}
