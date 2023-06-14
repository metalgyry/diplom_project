import {
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { GroupChatMessagesService } from "./group-chat-messages.service";
import { Prisma } from "@prisma/client";

@WebSocketGateway(Number(process.env.SERVER_SOCKET_CHAT_PORT), {
  cors: {
    origin: `${process.env.CLIENT_URL}${process.env.CLIENT_PORT}`,
  },
  path: '/chat/',
  serveClient: false,
  namespace: "/group-chat"
})
export class GroupChatMessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private groupChatMessagesService: GroupChatMessagesService) {}
  
  @WebSocketServer() server: Server;

  private getGroupChatInfo = async (client: Socket): Promise<string> => {
    const idGroup = client.handshake.auth.id_group;
    // const groupChatMessages = await this.groupChatMessagesService.allGroupChatMessages(Number(idGroup));
    // this.server.in(idGroup).emit("groupChatMessages:get", groupChatMessages);

    //throw new WsException('Ошибка при получении задач проекта!');
    return String(idGroup);
  };

  @SubscribeMessage("groupChatMessages:get")
  async handleProjectInfoAndTasksGet(@ConnectedSocket() client: Socket): Promise<void> {
    const idGroup = await this.getGroupChatInfo(client);
    console.log('ID: ', idGroup);
    const groupChatMessages = await this.groupChatMessagesService.allGroupChatMessages(Number(idGroup));
    this.server.in(idGroup).emit("groupChatMessages:get", groupChatMessages);
  }

  @SubscribeMessage("groupChatMessages:post")
  async handleProjectTaskPost(@MessageBody() message: Prisma.GroupChatMessagesCreateManyInput, @ConnectedSocket() client: Socket ): Promise<void> {
      const groupChatNewMessage = await this.groupChatMessagesService.createGroupChatMessage(message);
      const idGroup = await this.getGroupChatInfo(client);
      this.server.in(idGroup).emit("groupChatMessages:post", groupChatNewMessage);
  }

  @SubscribeMessage("groupChatMessages:patch")
  async handleProjectTaskPatch(@MessageBody() message: Prisma.GroupChatMessagesUncheckedUpdateWithoutGroupInput, @ConnectedSocket() client: Socket ): Promise<void> {
    const groupChatUpdateMessage = await this.groupChatMessagesService.updateGroupChatMessage(message);
    const idGroup = await this.getGroupChatInfo(client);
    this.server.in(idGroup).emit("groupChatMessages:patch", groupChatUpdateMessage);
  }

  @SubscribeMessage("groupChatMessages:delete")
  async handleMessageDelete(@MessageBody() id_message: number, @ConnectedSocket() client: Socket ): Promise<void>  {
    const groupChatDeleteMessage = await this.groupChatMessagesService.deleteGroupChatMessage(id_message);
    const idGroup = await this.getGroupChatInfo(client);
    this.server.in(idGroup).emit("groupChatMessages:delete", groupChatDeleteMessage);
  }

  afterInit(server: Server) {
    console.log(server);
  }

  handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    const id_group = client.handshake.auth.id_group;
    console.log("ID(handleConnection): ", id_group);
    client.join(id_group);
    client.on("disconnecting", () => {
      console.log("ID(disconnecting): ", id_group);
      client.leave(String(id_group));
    });
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const id_group = client.handshake.auth.id_group;
    console.log("ID(handleDisconnect): ", id_group);
    client.leave(String(id_group));
  }
}
