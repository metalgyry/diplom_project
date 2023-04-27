import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GroupProjects, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) {}

    async allProjects(id_student: number): Promise<GroupProjects[] | null> {
        // у нас может и не быть задач
        try {
            const studentProjects = await this.prisma.studentProject.findMany({
                where: { id_student: id_student },
            });
            // if (!studentProjects) {
            //     throw new HttpException(
            //         {
            //             status: HttpStatus.BAD_REQUEST,
            //             error: 'У пользователя нет привязанных к нему проектов!',
            //         }, 
            //         HttpStatus.BAD_REQUEST,
            //     );
            // }
            console.log(studentProjects);
            const arrayIdProjects = studentProjects.map((studentProjectsItem) => {
                return studentProjectsItem.id_group_project;
            });
            console.log(arrayIdProjects);
            const arrayProjects =  await this.prisma.groupProjects.findMany({
                where: { id_group_project: { in: arrayIdProjects }},
            });
            console.log(arrayProjects);
            return arrayProjects;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при получении проектов!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async createProject(dataProject: CreateProjectDto): Promise<GroupProjects> {
        try {
            // добавление студентов в проект много записей создать
            const project = await this.prisma.groupProjects.create({
                data: { ...dataProject },
            });
            return project;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при создании проекта!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async updateProject(dataProject: UpdateProjectDto): Promise<GroupProjects> { //, id: string
        try {
            const project = await this.prisma.groupProjects.update({
                data: {
                    name: dataProject.name,
                },
                where: { id_group_project: dataProject.id_group_project }, // Number(id)
            });
            return project;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при обновлении проекта!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
      }
    
      async deleteProject(id: string, id_student: number): Promise<Prisma.BatchPayload> {
        // TODO: посмотреть как можно обьединить все эти ТРИ ВЫЗОВА в ОДИН https://github.com/prisma/prisma/issues/6996
        try {
            await this.prisma.projectTasks.deleteMany({
                where: { id_group_project: Number(id) }, // тут нет еще однго условия
                // , id_student: id_student т.к. такого параметра нет у задач проекта
                // поэтому если кто захочет удалить проект просто по ссылке, то проект
                // он не сможет удалить, а          ЗАДАЧИ    ДА, ДА, ДА!!!
                // ДВА решения: либо добавить в задачи id_student, либо
                // сперва достать проект с удаляемым id и c id_student и если такой есть, то
                // разрешить и удалить задачи и удалить проект(тоесть поменять deleteMany на
                // delete!!!)
            });
            await this.prisma.studentProject.deleteMany({
                where: { id_group_project: Number(id) },
            })
            const deleteProjectCount = await this.prisma.groupProjects.deleteMany({
                where: { id_group_project: Number(id), id_creator: id_student},
            });
            return deleteProjectCount;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при удалении проекта!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
      }

}
