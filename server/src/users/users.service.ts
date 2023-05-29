import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Students } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getUserByLogin(login: string): Promise<Students | null> {
        try {
            let user = await this.prisma.students.findUnique({ where: { login } });
            return user;
        } catch (error) {
            console.log(error);
        }
      }

}
