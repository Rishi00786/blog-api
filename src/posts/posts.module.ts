import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  providers: [PostsService, DatabaseService],
  controllers: [PostsController],
})
export class PostsModule {}
