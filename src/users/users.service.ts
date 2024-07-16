import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseServices: DatabaseService) {}

  async createUser(createUserDTO: Prisma.UserCreateInput) {
    return this.databaseServices.user.create({
      data: createUserDTO,
    });
  }

  async findAll() {
    return this.databaseServices.user.findMany();
  }

  async findOne(email: string) {
    return this.databaseServices.user.findUnique({
      where: { email },
    });
  }

  async update(email: string, updateUserDTO: Prisma.UserUpdateInput) {
    return this.databaseServices.user.update({
      where: { email },
      data: updateUserDTO,
    });
  }

  async remove(email: string) {
    return this.databaseServices.user.delete({
      where: { email },
    });
  }
}
