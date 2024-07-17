import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './createCommentDto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty({ description: 'The content of the comment', required: false })
  content?: string;

  @ApiProperty({
    description: 'The ID of the post the comment is associated with',
    required: false,
  })
  postId?: string;
}
