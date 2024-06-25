import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
  import { AuthGuard } from './auth.guard';
  import { AuthService } from './auth.service';
  import { CreateUserDTO } from 'src/users/DTO/createUserDTO';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login') // /auth/login
  signIn(@Body() signInDto: CreateUserDTO) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  
}