import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AccessJwtAuthGuard } from 'src/auth/guards/auth.guard';
import { CreateSubTaskDto } from './dto/create-subtask.dto';
import { UpdateSubTaskDto } from './dto/update-subtask.dto';
import { SubTasksService } from './subtasks.service';

@Controller('subtasks')
export class SubTasksController {
    constructor(private subTasksService: SubTasksService ) {}

    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Get('/all')
    async getSubTasks(@Req() req: Request) {
      const tasks = await this.subTasksService.allSubTasks(req['user'].id_student);
      return tasks;
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Post('/create')
    async createNewSubTask(@Body() subTaskDto: CreateSubTaskDto) {
        const task = await this.subTasksService.createSubTask(subTaskDto);
        return task;
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Patch('/update')
    async updateOneSubTask(@Body() subTaskDto: UpdateSubTaskDto) {// @Param('id') id: string,
        const task = await this.subTasksService.updateSubTask(subTaskDto);
        return task;
    }
    
    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Delete('/delete/:id')
    async deleteOneSubTask(@Param('id') id: string) {
        const task = await this.subTasksService.deleteSubTask(id);
        return task;
    }

}
