import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreatePostDto } from './DTO/createPostDTO';
import { UpdatePostDto } from './DTO/updateUserDTO';
import { Post } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const { authorId, ...postData } = createPostDto;

    // Example logic to ensure author exists before creating the post
    const authorExists = await this.databaseService.user.findUnique({
      where: { id: authorId },
    });
    if (!authorExists) {
      throw new NotFoundException(`User with id ${authorId} not found.`);
    }

    const newPost = await this.databaseService.post.create({
      data: {
        ...postData,
        author: { connect: { id: authorId } },
      },
    });
    return newPost;
  }

  async findAllPosts(): Promise<Post[]> {
    return this.databaseService.post.findMany();
  }

  async findPostById(id: string): Promise<Post | null> {
    return this.databaseService.post.findUnique({
      where: { id },
    });
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const { title, content } = updatePostDto;

    const existingPost = await this.databaseService.post.findUnique({
      where: { id },
    });
    if (!existingPost) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    const updatedPost = await this.databaseService.post.update({
      where: { id },
      data: {
        title: title ?? existingPost.title,
        content: content ?? existingPost.content,
      },
    });

    return updatedPost;
  }

  async deletePost(id: string): Promise<void> {
    const existingPost = await this.databaseService.post.findUnique({
      where: { id },
    });
    if (!existingPost) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    await this.databaseService.post.delete({
      where: { id },
    });
  }
}
