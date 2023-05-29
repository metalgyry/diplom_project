import { Module } from '@nestjs/common';
import { GroupChatMessagesController } from './group-chat-messages.controller';
import { GroupChatMessagesService } from './group-chat-messages.service';
import { GroupChatMessagesGateway } from './group-chat-messages.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectsModule } from 'src/projects/projects.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [GroupChatMessagesController],
  providers: [GroupChatMessagesService, GroupChatMessagesGateway, PrismaService],
  imports: [AuthModule, ProjectsModule],
  exports: []
})
export class GroupChatMessagesModule {}
