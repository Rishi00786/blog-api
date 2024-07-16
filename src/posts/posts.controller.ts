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
import { PostsService } from './posts.service';
import { Post as PrismaPost } from '@prisma/client';
import { CreatePostDto } from './DTO/createPostDTO';
import { UpdatePostDto } from './DTO/updateUserDTO';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<PrismaPost> {
    try {
      return await this.postsService.createPost(createPostDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get()
  async findAll(): Promise<PrismaPost[]> {
    return this.postsService.findAllPosts();
  }

  @Get(':id')
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
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.postsService.deletePost(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
