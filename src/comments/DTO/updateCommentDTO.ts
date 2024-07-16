import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './createCommentDto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
