import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, GroupChatMessages } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupChatMessagesService {
    constructor(private prisma: PrismaService) {}

    async allGroupChatMessages(id_group: number): Promise<GroupChatMessages[] | null> {
        try {
            const groupChatMessages = await this.prisma.groupChatMessages.findMany({
                where: {id_group: id_group },
            });
            return groupChatMessages;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при получении сообщений группового чата!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async createGroupChatMessage(dataGroupChatMessage: Prisma.GroupChatMessagesCreateManyInput): Promise<GroupChatMessages> {
        try {
            const groupChatMessage = await this.prisma.groupChatMessages.create({
                data: { ...dataGroupChatMessage },
            });
            return groupChatMessage;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при создании сообщения в чате!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async updateGroupChatMessage(dataGroupChatMessages: Prisma.GroupChatMessagesUncheckedUpdateWithoutGroupInput): Promise<GroupChatMessages> {
        try {
            const groupChatMessage = await this.prisma.groupChatMessages.update({
                data: {
                    content: dataGroupChatMessages.content,
                },
                where: { id_message: Number(dataGroupChatMessages.id_message) },
            });
            return groupChatMessage;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при изменении сообщения в чате!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
      }
    
      async deleteGroupChatMessage(id: number): Promise<number> {
        try {
            // В СОКЕТАХ я жду что при удалении мне вернется id удаленного сообщения (оставил deleteMany, может буду проверять кто удалил)
            const deletegroupChatMessageCount = await this.prisma.groupChatMessages.deleteMany({
                where: { id_message: Number(id) },
            });
            return id;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при удалении сообщения в чате!',
                }, 
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
      }
}
