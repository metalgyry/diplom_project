import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AccessJwtAuthGuard } from 'src/auth/guards/auth.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(private projectsService: ProjectsService ) {}

    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Get('/all')
    async getProjects(@Req() req: Request) {
      const projects = await this.projectsService.allProjects(req['user'].id_student);
      return projects;
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Post('/create')
    async createNewProjects(@Body() projectDto: CreateProjectDto) {
        const project = await this.projectsService.createProject(projectDto);
        return project;
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Patch('/update')
    async updateOneProjects(@Body() taskDto: UpdateProjectDto) {// @Param('id') id: string,
        const project = await this.projectsService.updateProject(taskDto);
        return project;
    }
    
    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Delete('/delete/:id')
    async deleteOneProjects(@Param('id') id: string, @Req() req: Request) {
        const project = await this.projectsService.deleteProject(id, req['user'].id_student);
        return project;
    }

}
