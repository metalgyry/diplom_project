import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, ProjectTasks } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectTasksService {
    constructor(private prisma: PrismaService) {}

    async allProjectTasks(id_group_project: number): Promise<ProjectTasks[] | null> {
        try {
            const projectTasks = await this.prisma.projectTasks.findMany({
                where: {id_group_project: id_group_project },
            });
            return projectTasks;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при получении задач проекта!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async createProjectTask(dataProjectTask: Prisma.ProjectTasksCreateManyInput): Promise<ProjectTasks> {
        try {
            const projectTask = await this.prisma.projectTasks.create({
                data: { ...dataProjectTask },
            });
            return projectTask;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при создании задачи проекта!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async updateProjectTask(dataProjectTask: Prisma.ProjectTasksUncheckedUpdateWithoutProjectInput): Promise<ProjectTasks> {
        try {
            const projectTask = await this.prisma.projectTasks.update({
                data: {
                    content: dataProjectTask.content,
                },
                where: { id_task: Number(dataProjectTask.id_task) },
            });
            return projectTask;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при обновлении задачи проекта!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
      }

      async updateProjectTaskStatus(dataProjectTask: Prisma.ProjectTasksUncheckedUpdateWithoutProjectInput): Promise<ProjectTasks> {
        try {
            const projectTask = await this.prisma.projectTasks.update({
                data: {
                    status: dataProjectTask.status,
                },
                where: { id_task: Number(dataProjectTask.id_task) },
            });
            return projectTask;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при обновлении задачи проекта!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
      }
    
      async deleteProjectTask(id: number): Promise<number> {
        try {
            const deleteProjectTaskCount = await this.prisma.projectTasks.deleteMany({
                where: { id_task: Number(id) },
            });
            return id;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при удалении задачи проекта!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
      }
}
