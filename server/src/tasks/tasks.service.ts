import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Tasks } from '@prisma/client';
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
                    status: HttpStatus.FORBIDDEN,
                    error: 'Ошибка при получении задач!',
                }, 
                HttpStatus.FORBIDDEN,
            );
        }
    }

    async createTask(dataTask: CreateTaskDto): Promise<Tasks> {
        try {
            // TODO: нужно разобраться с датой в ЗАДАЧАХ
            const task = await this.prisma.tasks.create({ data: { ...dataTask } });
            return task;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: 'Ошибка при создании задачи!',
                }, 
                HttpStatus.FORBIDDEN,
            );
        }
    }

    async updateTask(dataTask: UpdateTaskDto, id: string): Promise<Tasks> {
        try {
            const task = await this.prisma.tasks.update({
                data: { ...dataTask },
                where: { id_task: Number(id) },
            });
            return task;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: 'Ошибка при обновлении задачи!',
                }, 
                HttpStatus.FORBIDDEN,
            );
        }
      }
    
      async deleteTask(id: string): Promise<Tasks> {
        try {
            const task = await this.prisma.tasks.delete({
                where: { id_task: Number(id) },
            });
            return task;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: 'Ошибка при удалении задачи!',
                }, 
                HttpStatus.FORBIDDEN,
            );
        }
      }

}
