import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './DTO/createCommentDTO';
import { UpdateCommentDto } from './DTO/updateCommentDTO';
import { Comment as PrismaComment } from '@prisma/client';

@ApiTags('comments') // Tag for Swagger UI
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a comment' })
  @ApiResponse({
    status: 201,
    description: 'The comment has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Invalid data provided.' })
  async create(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<PrismaComment> {
    return await this.commentsService.createComment(createCommentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({ status: 200, description: 'Returns all comments.' })
  async findAll(): Promise<PrismaComment[]> {
    return this.commentsService.findAllComments();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by ID' })
  @ApiResponse({ status: 200, description: 'Returns a comment by ID.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  async findOne(@Param('id') id: string): Promise<PrismaComment | null> {
    return this.commentsService.findCommentById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a comment by ID' })
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<PrismaComment> {
    return await this.commentsService.updateComment(id, updateCommentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiResponse({
    status: 204,
    description: 'The comment has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.commentsService.deleteComment(id);
  }
}
