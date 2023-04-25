import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AccessJwtAuthGuard } from 'src/auth/guards/auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService ) {}

    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Get('/all')
    async getTasks(@Req() req: Request) {
      const tasks = await this.tasksService.allTasks(req['user'].id_student);
      return tasks;
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Post('/create')
    async createNewTask(@Body() taskDto: CreateTaskDto) {
        const task = await this.tasksService.createTask(taskDto);
        return task;
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Patch('/update')
    async updateOneTask(@Body() taskDto: UpdateTaskDto) {// @Param('id') id: string,
        const task = await this.tasksService.updateTask(taskDto);
        return task;
    }
    
    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Delete('/delete/:id')
    async deleteOneTask(@Param('id') id: string) {
        const task = await this.tasksService.deleteTask(id);
        return task;
    }

}
