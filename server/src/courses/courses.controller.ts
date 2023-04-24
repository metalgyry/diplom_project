import { Controller, Get, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { Courses, SubTasks, Tasks } from '@prisma/client';
import { AccessJwtAuthGuard } from '../auth/guards/auth.guard';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
    constructor(private coursesService: CoursesService ) {}

    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Get()
    async getCourses(@Req() req: Request): Promise<(Courses & {tasks: (Tasks & {subTasks: SubTasks[]})[]})[] | null> {
      const tasks = await this.coursesService.getCourses(req['user'].id_student, req['user'].id_group);
      return tasks;
    }

}
