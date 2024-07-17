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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { Post as PrismaPost } from '@prisma/client';
import { CreatePostDto } from './DTO/createPostDTO';
import { UpdatePostDto } from './DTO/updateUserDTO';

@ApiTags('posts') // Tag for Swagger UI
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Invalid data provided.' })
  async create(@Body() createPostDto: CreatePostDto): Promise<PrismaPost> {
    try {
      return await this.postsService.createPost(createPostDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'Returns all posts.' })
  async findAll(): Promise<PrismaPost[]> {
    return this.postsService.findAllPosts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiResponse({ status: 200, description: 'Returns a post by ID.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  async findOne(@Param('id') id: string): Promise<PrismaPost | null> {
    try {
      const post = await this.postsService.findPostById(id);
      if (!post) {
        throw new NotFoundException(`Post with id ${id} not found.`);
      }
      return post;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a post by ID' })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully updated.',
  })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PrismaPost> {
    try {
      return await this.postsService.updatePost(id, updatePostDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by ID' })
  @ApiResponse({
    status: 204,
    description: 'The post has been successfully deleted.',
  })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.postsService.deletePost(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
