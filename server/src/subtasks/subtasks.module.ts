import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubTasksController } from './subtasks.controller';
import { SubTasksService } from './subtasks.service';

@Module({
  controllers: [SubTasksController],
  providers: [SubTasksService, PrismaService],
  imports: [AuthModule],
  exports: []
})
export class SubTasksModule {}
