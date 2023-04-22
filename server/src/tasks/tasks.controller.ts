import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AccessJwtAuthGuard } from 'src/auth/guards/auth.guard';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService ) {}

    // @UseGuards(AccessJwtAuthGuard)
    // @Get()
    // async getTasks(@Req() req: Request) {
    //   const tasks = await this.tasksService.tasks(req['user'].id_student);
    //   return tasks;
    // }

    // @UseGuards(AccessJwtAuthGuard)
    // @Post('/create')
    // async createNewTask(@Req() req: Request, @Body() taskDto: CreateTaskDto) {
    //     taskDto.authorId = req['user'].id;
    //     const task = await this.tasksService.createTask(taskDto);
    //     return task;
    // }
  
    // @UseGuards(AccessJwtAuthGuard)
    // @Put('/update/:id')
    // async updateOneTask(@Param('id') id: string, @Body() taskDto: UpdateTaskDto) {
    //     const task = await this.tasksService.updateTask(taskDto, id);
    //     return task;
    // }
    
    // @UseGuards(AccessJwtAuthGuard)
    // @Delete('/delete/:id')
    // async deleteOneTask(@Param('id') id: string) {
    //     const task = await this.tasksService.deleteTask(id);
    //     return task;
    // }

}
