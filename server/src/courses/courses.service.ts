import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Courses, Prisma, SubTasks, Tasks } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
    constructor(private prisma: PrismaService) {}

    async getCourses(id_student: number): Promise<Courses[]> {
        try {
            const coursesAndTasks =  await this.prisma.courses.findMany({
                where: { id_creator: id_student },
                include: {
                    tasks: {
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
