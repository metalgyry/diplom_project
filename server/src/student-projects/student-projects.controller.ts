import { Controller, Delete, HttpCode, HttpStatus, Param, Req, UseGuards } from '@nestjs/common';
import { AccessJwtAuthGuard } from 'src/auth/guards/auth.guard';
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

}
