import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SubTasks } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubTaskDto } from './dto/create-subtask.dto';
import { UpdateSubTaskDto } from './dto/update-subtask.dto';

@Injectable()
export class SubTasksService {
    constructor(private prisma: PrismaService) {}

    // async allSubTasks(id_student: number): Promise<SubTasks[] | null> {
    //     try {
    //         const subtasks = await this.prisma.subTasks.findMany({
    //             where: {id_student: id_student },
    //         });
    //         return subtasks;
    //     } catch (error) {
    //         console.log(error);
    //         throw new HttpException(
    //             {
    //                 status: HttpStatus.INTERNAL_SERVER_ERROR,
    //                 error: 'Ошибка при получении подзадач!',
    //             }, 
    //             HttpStatus.INTERNAL_SERVER_ERROR,
    //         );
    //     }
    // }

    async createSubTask(dataTask: CreateSubTaskDto): Promise<SubTasks> {
        try {
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

    async updateSubTask(dataTask: UpdateSubTaskDto): Promise<SubTasks> {
        try {
            const subtasks = await this.prisma.subTasks.update({
                data: {
                    content: dataTask.content,
                    priority: dataTask.priority,
                },
                where: { id_subtask: dataTask.id_subtask },
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
    
      async deleteSubTask(id: string, id_student: number): Promise<SubTasks> {
        try {
            const deleteSubTask = await this.prisma.subTasks.delete({
                where: { id_subtask: Number(id) },
            });
            return deleteSubTask;
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
