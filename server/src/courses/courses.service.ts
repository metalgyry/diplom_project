import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Courses, SubTasks, Tasks } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoursesService {
    constructor(private prisma: PrismaService) {}

    async getCourses(id_student: number, id_group: number): Promise<(Courses & {tasks: (Tasks & {subTasks: SubTasks[]})[]})[]> {
        try {
            const groupCourses = await this.prisma.groupCourses.findMany({
              where: { id_group: id_group },
            });
            if (!groupCourses) { // Возможно придется убрать если самостоятельно студент будет создавать курсы
                throw new HttpException(
                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: 'У группы пользователя нет привязанных курсов!',
                    }, 
                    HttpStatus.BAD_REQUEST,
                );
            }
            console.log(groupCourses);
            const arrayIdCourses = groupCourses.map((groupCoursesItem) => {
                return groupCoursesItem.id_course;
            });
            console.log(arrayIdCourses);
            const coursesAndTasks =  await this.prisma.courses.findMany({
                where: { id_course: { in: arrayIdCourses }},
                include: {
                    tasks: {
                        where: {
                            id_student: id_student,
                        },
                        include: {
                            subTasks: true,
                        }
                    }
                }
            });
            console.log(coursesAndTasks);

            return coursesAndTasks;
          } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при получении списка курсов!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
    }

}
