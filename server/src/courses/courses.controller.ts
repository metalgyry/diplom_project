import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AccessJwtAuthGuard } from 'src/auth/guards/auth.guard';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
    constructor(private coursesService: CoursesService ) {}

    //@UseGuards(AccessJwtAuthGuard)
    @Get()
    async getCourses(@Req() req: Request) {
      const tasks = await this.coursesService.getCourses(1,1906); // req['user'].id_student, req['user'].id_group
      return tasks;
    }

}
