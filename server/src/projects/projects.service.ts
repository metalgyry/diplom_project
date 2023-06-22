import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GroupProjects, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentProjectsService } from 'src/student-projects/student-projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService,
        private studentProjectsService: StudentProjectsService) {}
        
    async oneProjectAndIncludeOther(id_group_project: number): Promise<GroupProjects & {students: {id_student: number, full_name: string}[]}> {
        try {
            const project = await this.prisma.groupProjects.findUnique({
                where: { id_group_project:  id_group_project},
                include: { students: true},
            });
            const idStudents = project.students.map((student) => student.id_student);
            const students = await this.prisma.students.findMany({
                where: {id_student: {in: idStudents} },
                select: {id_student: true, full_name: true},
            });
            const result = {id_group_project: project.id_group_project, name: project.name, id_creator: project.id_creator,
                            name_creator: project.name_creator, students: students};
            return result;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при получении данных проекта!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async allProjects(id_student: number): Promise<GroupProjects[] | null> {
        try {
            const studentProjects = await this.prisma.studentProjects.findMany({
                where: { id_student: id_student },
            });
            const arrayIdProjects = studentProjects.map((studentProjectsItem) => {
                return studentProjectsItem.id_group_project;
            });
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
            console.log(dataProject);
            const project = await this.prisma.groupProjects.create({
                data: { name: dataProject.name, id_creator: dataProject.id_creator, name_creator: dataProject.name_creator },
            });
            const listStudent = dataProject.students.map((id_student) => {
                return { id_group_project: project.id_group_project, id_student: id_student };
            });
            await this.prisma.studentProjects.createMany({
                data: listStudent,
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

    async updateProject(dataProject: UpdateProjectDto): Promise<GroupProjects> {
        try {
            const project = await this.prisma.groupProjects.update({
                data: {
                    name: dataProject.name,
                },
                where: { id_group_project: dataProject.id_group_project },
            });

            const updateListStudents = {id_group_project: dataProject.id_group_project, id_students: dataProject.students};

            await this.studentProjectsService.updateStudentInGroupProject(updateListStudents);

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
        try {
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
