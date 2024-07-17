import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ description: 'The content of the comment' })
  content: string;

  @ApiProperty({
    description: 'The ID of the post to which the comment belongs',
  })
  postId: string;
}
