import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './DTO/createCommentDTO';
import { UpdateCommentDto } from './DTO/updateCommentDTO';
import { Comment as PrismaComment } from '@prisma/client';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<PrismaComment> {
    try {
      return await this.commentsService.createComment(createCommentDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get()
  async findAll(): Promise<PrismaComment[]> {
    return this.commentsService.findAllComments();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PrismaComment | null> {
    try {
      const comment = await this.commentsService.findCommentById(id);
      if (!comment) {
        throw new NotFoundException(`Comment with id ${id} not found.`);
      }
      return comment;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<PrismaComment> {
    try {
      return await this.commentsService.updateComment(id, updateCommentDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.commentsService.deleteComment(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
