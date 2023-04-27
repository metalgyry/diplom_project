import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, SubTasks } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubTaskDto } from './dto/create-subtask.dto';
import { UpdateSubTaskDto } from './dto/update-subtask.dto';

@Injectable()
export class SubTasksService {
    constructor(private prisma: PrismaService) {}

    async allSubTasks(id_student: number): Promise<SubTasks[] | null> {
        // у нас может и не быть задач
        try {
            const subtasks = await this.prisma.subTasks.findMany({
                where: {id_student: id_student },
            });
            return subtasks;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при получении подзадач!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async createSubTask(dataTask: CreateSubTaskDto): Promise<SubTasks> {
        try {
            // TODO: нужно разобраться с датой в ЗАДАЧАХ
            const subtasks = await this.prisma.subTasks.create({
                data: { ...dataTask }
            });
            return subtasks;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при создании подзадачи!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async updateSubTask(dataTask: UpdateSubTaskDto): Promise<SubTasks> { //, id: string
        try {
            const subtasks = await this.prisma.subTasks.update({
                data: {
                    content: dataTask.content,
                    priority: dataTask.priority,
                },
                where: { id_subtask: dataTask.id_subtask }, // Number(id)
            });
            return subtasks;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при обновлении подзадачи!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
      }
    
      async deleteSubTask(id: string, id_student: number): Promise<Prisma.BatchPayload> {
        try {
            const deleteSubTaskCount = await this.prisma.subTasks.deleteMany({
                where: { id_subtask: Number(id), id_student: id_student },
            });
            return deleteSubTaskCount;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при удалении подзадачи!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
      }

}
