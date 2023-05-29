import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Courses, Prisma, SubTasks, Tasks } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
    constructor(private prisma: PrismaService) {}

    async getCourses(id_student: number): Promise<Courses[]> {// (Courses & {tasks: (Tasks & {subTasks: SubTasks[]})[]})[]
        try {
            // const groupCourses = await this.prisma.groupCourses.findMany({
            //   where: { id_group: id_group },
            // });
            // if (!groupCourses) { // Возможно придется убрать если самостоятельно студент будет создавать курсы
            //     throw new HttpException(
            //         {
            //             status: HttpStatus.BAD_REQUEST,
            //             error: 'У группы пользователя нет привязанных курсов!',
            //         }, 
            //         HttpStatus.BAD_REQUEST,
            //     );
            // }
            // console.log(groupCourses);
            // const arrayIdCourses = groupCourses.map((groupCoursesItem) => {
            //     return groupCoursesItem.id_course;
            // });
            // console.log(arrayIdCourses);
            const coursesAndTasks =  await this.prisma.courses.findMany({
                where: { id_creator: id_student },
                include: {
                    tasks: {
                        // { 
                        // where: {
                        //     id_student: id_student,
                        // },
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

    async createCourse(dataCourseDto: CreateCourseDto): Promise<Courses> {
        try {
            console.log(dataCourseDto);
            
            const createdCourse = await this.prisma.courses.create({
                data: {...dataCourseDto },
                include: {
                    tasks: {
                        include: {
                            subTasks: true,
                        },
                    },
                },
            });
            return createdCourse;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при создании курса!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async updateCourse(dataCourseDto: UpdateCourseDto): Promise<Courses> {
        try {
            const updatedCourse = await this.prisma.courses.update({
                data: {
                    name: dataCourseDto.name,
                },
                where: { id_course: Number(dataCourseDto.id_course) },
            });
            return updatedCourse;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при обновлении курса!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
      }

      async deleteCourse(id: string, id_student: number): Promise<Prisma.BatchPayload> {
        try {
            // не работает так как id - это id_course а нельзя удалять по id_subtask
            // await this.prisma.subTasks.deleteMany({
            //     where: { id_subtask!!!: !Number(id)!, id_student: id_student },
            // });
            // ТУТ верно,но сделано каскадное удаление
            // const deleteTaskCount = await this.prisma.tasks.deleteMany({
            //     where: { id_task: Number(id), id_student: id_student },
            // });
            const deletedCourseCount = await this.prisma.courses.deleteMany({
                where: { id_course: Number(id), id_creator: id_student},
            });
            return deletedCourseCount;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при удалении курса!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
      }
}
