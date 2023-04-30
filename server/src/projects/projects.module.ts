import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentProjectsModule } from 'src/student-projects/student-projects.module';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService],
  imports: [AuthModule, StudentProjectsModule],
  exports: []
})
export class ProjectsModule {}
