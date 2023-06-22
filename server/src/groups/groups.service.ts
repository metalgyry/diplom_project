import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupsService {
    constructor(private prisma: PrismaService) {}

    async getGroupStudents(id_group: number) {
        try {
            const groupStudents = await this.prisma.groups.findUnique({
              where: { id_group: id_group },
              include: { students: {
                select: { id_student: true, full_name: true},
              } },
            });
            const students = groupStudents.students;
            console.log(students);
            return students;
          } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при получении списка студентов!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
    }

    async getGroupName(id_group: number): Promise<{name: string}> {
      try {
          const groupName = await this.prisma.groups.findUnique({
            where: { id_group: id_group },
            select: {name: true},
          });
          console.log(groupName);
          return groupName;
        } catch (error) {
          console.log(error);
          throw new HttpException(
              {
                  status: HttpStatus.INTERNAL_SERVER_ERROR,
                  error: 'Ошибка при получении названия группы!',
              }, 
              HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
  }
}
