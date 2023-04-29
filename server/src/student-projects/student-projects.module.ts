import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentProjectsController } from './student-projects.controller';
import { StudentProjectsService } from './student-projects.service';

@Module({
  controllers: [StudentProjectsController],
  providers: [StudentProjectsService, PrismaService],
  imports: [AuthModule],
  exports: []
})
export class StudentProjectsModule {}
