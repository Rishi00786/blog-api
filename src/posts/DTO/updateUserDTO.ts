import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './createPostDTO';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({ example: 'Updated title of the post' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'Updated content of the post' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ example: 'Updated author ID of the post' })
  @IsOptional()
  @IsString()
  authorId?: string;
}
