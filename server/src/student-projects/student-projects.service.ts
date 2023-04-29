import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentProjectsService {
    constructor(private prisma: PrismaService) {}
    
    async exitStudentProject(id: string, id_student: number): Promise<Prisma.BatchPayload> {
        try {
            const exitProject = await this.prisma.studentProject.deleteMany({
                where: { id_group_project: Number(id), id_student: id_student },
            })
            return exitProject;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при выходе из проекта!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }


}
