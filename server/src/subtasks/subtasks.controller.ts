import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AccessJwtAuthGuard } from 'src/auth/guards/auth.guard';
import { CreateSubTaskDto } from './dto/create-subtask.dto';
import { UpdateSubTaskDto } from './dto/update-subtask.dto';
import { SubTasksService } from './subtasks.service';

@Controller('subtasks')
export class SubTasksController {
    constructor(private subTasksService: SubTasksService ) {}

    // @HttpCode(HttpStatus.OK)
    // @UseGuards(AccessJwtAuthGuard)
    // @Get('/all')
    // async getSubTasks(@Req() req: Request) {
    //   const subTasks = await this.subTasksService.allSubTasks(req['user'].id_student);
    //   return subTasks;
    // }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Post('/create')
    async createNewSubTask(@Body() subTaskDto: CreateSubTaskDto) {
        const SubTask = await this.subTasksService.createSubTask(subTaskDto);
        return SubTask;
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Patch('/update')
    async updateOneSubTask(@Body() subTaskDto: UpdateSubTaskDto) {
        const SubTask = await this.subTasksService.updateSubTask(subTaskDto);
        return SubTask;
    }
    
    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Delete('/delete/:id')
    async deleteOneSubTask(@Param('id') id: string, @Req() req: Request) {
        const deleteSubTask = await this.subTasksService.deleteSubTask(id, req['user'].id_student);
        return deleteSubTask;
    }

}
