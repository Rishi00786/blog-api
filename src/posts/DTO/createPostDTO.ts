import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'Title of the post' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Content of the post' })
  @IsString()
  content: string;

  @ApiProperty({ example: 'Author ID of the post' })
  @IsString()
  authorId: string;
}
