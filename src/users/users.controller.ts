import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDTO: Prisma.UserCreateInput){
        return this.usersService.createUser(createUserDTO)
    }

    @Get()
    findAll(){
        return this.usersService.findAll()
    }

    @Get(':email')
    findOne(@Param('email') email: string){
        return this.usersService.findOne(email)
    }

    @Patch(':email')
    update(@Param('email') email: string , @Body() updateUserDTO: Prisma.UserUpdateInput){
        return this.usersService.update(email, updateUserDTO)
    }

    @Delete(':email')
    remove(@Param('email') email: string){
        return this.usersService.remove(email)
    }

}
