import { CreatePostDto } from './createPostDTO';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
