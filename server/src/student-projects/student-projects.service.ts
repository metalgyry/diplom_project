import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateListStudentsDto } from './dto/update-list-students.dto';

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
    
    async getListStudentsInGroupProject(id_project: string): Promise<{id_student: number, full_name: string}[] | null> {
        try {
            const listStudents = await this.prisma.studentProject.findMany({
                where: { id_group_project: Number(id_project) },
                select: {id_student: true},
            })
            const listIdStudents = listStudents.map((student) => student.id_student);

            const arrayNameStudents = await this.prisma.students.findMany({
                where: { id_student: {in: listIdStudents} },
                select: { id_student: true, full_name: true },
            });
            console.log('arrayNameStudents: ', arrayNameStudents);

            return arrayNameStudents;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при получении списка стдунентов проекта!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async updateStudentInGroupProject(dataUpdateStudentsProject: UpdateListStudentsDto): Promise<Prisma.BatchPayload> {
        try {
            console.log(dataUpdateStudentsProject);
            const deleteStudentsProjectCount = await this.prisma.studentProject.deleteMany({
                where: { id_group_project: dataUpdateStudentsProject.id_group_project},
            });
            console.log(deleteStudentsProjectCount);

            const listStudent = dataUpdateStudentsProject.id_students.map((id_student) => {
                return { id_group_project: dataUpdateStudentsProject.id_group_project, id_student: id_student };
            });

            const updateStudentsProjectCount = await this.prisma.studentProject.createMany({
                data: listStudent,
            });
            return updateStudentsProjectCount;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при обновлении списка студентов проекта!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
      }

}
