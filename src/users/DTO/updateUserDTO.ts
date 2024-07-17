import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';
import { CreateUserDTO } from './createUserDTO';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @ApiProperty({ example: 'updated@example.com' })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @ApiProperty({ example: 'updatedPassword123' })
  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password?: string;
}
