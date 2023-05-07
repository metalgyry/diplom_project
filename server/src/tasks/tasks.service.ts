import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Tasks } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}

    async allTasks(id_student: number): Promise<Tasks[] | null> {
        // у нас может и не быть задач
        try {
            const tasks = await this.prisma.tasks.findMany({
                where: {id_student: id_student },
            });
            return tasks;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при получении задач!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async createTask(dataTask: CreateTaskDto): Promise<Tasks> {
        try {
            // TODO: нужно разобраться с датой в ЗАДАЧАХ
            const task = await this.prisma.tasks.create({
                data: { ...dataTask },
                include: {
                    subTasks: true,
                }
            });
            return task;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при создании задачи!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async updateTask(dataTask: UpdateTaskDto): Promise<Tasks> { //, id: string
        try {
            const task = await this.prisma.tasks.update({
                data: {
                    content: dataTask.content,
                    date: dataTask.date,
                    priority: dataTask.priority,
                },
                where: { id_task: dataTask.id_task }, // Number(id)
            });
            return task;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при обновлении задачи!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
      }
    
      async deleteTask(id: string, id_student: number): Promise<Prisma.BatchPayload> {
        try {
            // реализовано каскадное удаление, поэтому не понадобится
            // await this.prisma.subTasks.deleteMany({
            //     where: { id_task: Number(id), id_student: id_student },
            // });
            const deleteTaskCount = await this.prisma.tasks.deleteMany({
                where: { id_task: Number(id), id_student: id_student },
            });
            return deleteTaskCount;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при удалении задачи!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
      }

}
