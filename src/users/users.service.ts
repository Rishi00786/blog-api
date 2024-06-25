import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {

    constructor(private readonly databaseSevervices: DatabaseService) {}

    async createUser(createUserDTO: Prisma.UserCreateInput){
        return this.databaseSevervices.user.create({
            data: createUserDTO
        })
    }

    async findAll(){
        return this.databaseSevervices.user.findMany()
    }

    async findOne(email: string){
        return this.databaseSevervices.user.findUnique({
            where: {
                email: email
            }
        })
    }

    async update(email: string , updateUserDTO: Prisma.UserUpdateInput){
        return this.databaseSevervices.user.update({
            where: {
                email: email
            },
            data: updateUserDTO
        })
    }

    async remove(email: string){
        return this.databaseSevervices.user.delete({
            where: {
                email: email
            }
        })
    }

}
