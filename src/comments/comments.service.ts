import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateCommentDto } from './DTO/createCommentDTO';
import { Comment } from '@prisma/client';
import { UpdateCommentDto } from './DTO/updateCommentDTO';

@Injectable()
export class CommentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { postId, ...commentData } = createCommentDto;

    // Example logic to ensure post exists before creating the comment
    const postExists = await this.databaseService.post.findUnique({
      where: { id: postId },
    });
    if (!postExists) {
      throw new NotFoundException(`Post with id ${postId} not found.`);
    }

    const newComment = await this.databaseService.comment.create({
      data: {
        ...commentData,
        post: { connect: { id: postId } },
      },
    });

    return newComment;
  }

  async findAllComments(): Promise<Comment[]> {
    return this.databaseService.comment.findMany();
  }

  async findCommentById(id: string): Promise<Comment | null> {
    return this.databaseService.comment.findUnique({
      where: { id },
    });
  }

  async updateComment(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { postId, ...commentData } = updateCommentDto;

    // Ensure comment exists before updating
    const existingComment = await this.databaseService.comment.findUnique({
      where: { id },
    });
    if (!existingComment) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    const updatedComment = await this.databaseService.comment.update({
      where: { id },
      data: {
        ...commentData,
      },
    });

    return updatedComment;
  }

  async deleteComment(id: string): Promise<void> {
    const existingComment = await this.databaseService.comment.findUnique({
      where: { id },
    });
    if (!existingComment) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    await this.databaseService.comment.delete({
      where: { id },
    });
  }
}
