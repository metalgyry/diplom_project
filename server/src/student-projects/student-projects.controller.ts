import { Controller, Delete, Put, HttpCode, HttpStatus, Param, Req, UseGuards, Body, Get } from '@nestjs/common';
import { AccessJwtAuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateStudentProjectDto } from './dto/update-student-project.dto';
import { StudentProjectsService } from './student-projects.service';

@Controller('student-projects')
export class StudentProjectsController {
    constructor(private studentProjectsService: StudentProjectsService ) {}

    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Delete('/exit:id')
    async exitOneStudentProject(@Param('id') id: string, @Req() req: Request) {
        const project = await this.studentProjectsService.exitStudentProject(id, req['user'].id_student);
        return project;
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Put('/update')
    async updateStudentInGroupProject(@Body() studentsProjectDto: UpdateStudentProjectDto) {
        const updateStudentsProjectCount = await this.studentProjectsService.updateStudentInGroupProject(studentsProjectDto);
        return updateStudentsProjectCount;
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Get('/list-students:id')
    async getListStudentsInGroupProject(@Param('id') id: string) {//, @Req() req: Request
        const listStudents = await this.studentProjectsService.getListStudentsInGroupProject(id);//, req['user'].id_student
        return listStudents;
    }1

}
