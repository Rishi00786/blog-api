import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('users') // Tag for Swagger UI
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Invalid data provided.' })
  create(@Body() createUserDTO: Prisma.UserCreateInput) {
    return this.usersService.createUser(createUserDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns all users.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':email')
  @ApiOperation({ summary: 'Get a user by email' })
  @ApiResponse({ status: 200, description: 'Returns a user by email.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Patch(':email')
  @ApiOperation({ summary: 'Update a user by email' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  update(
    @Param('email') email: string,
    @Body() updateUserDTO: Prisma.UserUpdateInput,
  ) {
    return this.usersService.update(email, updateUserDTO);
  }

  @Delete(':email')
  @ApiOperation({ summary: 'Delete a user by email' })
  @ApiResponse({
    status: 204,
    description: 'The user has been successfully deleted.',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  remove(@Param('email') email: string) {
    return this.usersService.remove(email);
  }
}
