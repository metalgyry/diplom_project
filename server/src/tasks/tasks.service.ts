import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Tasks } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}

    // async allTasks(id_student: number): Promise<Tasks[] | null> {
    //     try {
    //         const tasks = await this.prisma.tasks.findMany({
    //             where: {id_student: id_student },
    //         });
    //         return tasks;
    //     } catch (error) {
    //         console.log(error);
    //         throw new HttpException(
    //             {
    //                 status: HttpStatus.INTERNAL_SERVER_ERROR,
    //                 error: 'Ошибка при получении задач!',
    //             }, 
    //             HttpStatus.INTERNAL_SERVER_ERROR,
    //         );
    //     }
    // }

    async createTask(dataTask: CreateTaskDto): Promise<Tasks> {
        try {
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

    async updateTask(dataTask: UpdateTaskDto): Promise<Tasks> {
        try {
            const task = await this.prisma.tasks.update({
                data: {
                    content: dataTask.content,
                    date: dataTask.date,
                    priority: dataTask.priority,
                },
                where: { id_task: dataTask.id_task },
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
    
      async deleteTask(id: string, id_student: number): Promise<Tasks> {
        try {
            const deleteTask = await this.prisma.tasks.delete({
                where: { id_task: Number(id) },
            });
            return deleteTask;
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
