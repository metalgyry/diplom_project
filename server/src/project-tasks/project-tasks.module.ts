import { Module } from '@nestjs/common';
import { ProjectTasksController } from './project-tasks.controller';
import { ProjectTasksService } from './project-tasks.service';
import { ProjectTasksGateway } from './project-tasks.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectsModule } from 'src/projects/projects.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProjectTasksController],
  providers: [ProjectTasksService, ProjectTasksGateway, PrismaService],
  imports: [AuthModule, ProjectsModule],
  exports: []
})
export class ProjectTasksModule {}
