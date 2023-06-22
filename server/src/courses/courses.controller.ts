import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Courses } from '@prisma/client';
import { AccessJwtAuthGuard } from '../auth/guards/auth.guard';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
    constructor(private coursesService: CoursesService ) {}

    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Get()
    async getCourses(@Req() req: Request): Promise<Courses[] | null> {
      const courses = await this.coursesService.getCourses(req['user'].id_student);
      return courses;
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Post('/create')
    async createNewCourse(@Body() courseDto: CreateCourseDto) {
        const course = await this.coursesService.createCourse(courseDto);
        return course;
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Patch('/update')
    async updateCourse(@Body() courseDto: UpdateCourseDto) {
        const course = await this.coursesService.updateCourse(courseDto);
        return course;
    }
    
    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Delete('/delete/:id')
    async deleteCourse(@Param('id') id: string, @Req() req: Request) {
        const deleteCoursesCount = await this.coursesService.deleteCourse(id, req['user'].id_student);
        return deleteCoursesCount;
    }

}
