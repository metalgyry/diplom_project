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
import { ProjectTasksService } from "./project-tasks.service";
import { ProjectsService } from "src/projects/projects.service";
import { Prisma } from "@prisma/client";

@WebSocketGateway(Number(process.env.SERVER_SOCKET_PROJECT_PORT), {
  cors: {
    origin: `${process.env.CLIENT_URL}${process.env.CLIENT_PORT}`,
  },
  path: '/project/',
  serveClient: false,
  namespace: "/one-project"
})
export class ProjectTasksGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private projectTasksService: ProjectTasksService,
              private projectsService: ProjectsService) {}

  @WebSocketServer() server: Server;

  private getProjectInfo = async (client: Socket): Promise<string> => {
    const idProject = client.handshake.auth.id_group_project;
    return String(idProject);
  };

  @SubscribeMessage("projectInfoAndTasks:get")
  async handleProjectInfoAndTasksGet(@ConnectedSocket() client: Socket): Promise<void> {
    const idProject = await this.getProjectInfo(client);
    console.log('ID: ', idProject);
    const projectInfo = await this.projectsService.oneProjectAndIncludeOther(Number(idProject));
    this.server.in(idProject).emit("projectInfo:get", projectInfo);
    const projectTasks = await this.projectTasksService.allProjectTasks(Number(idProject));
    this.server.in(idProject).emit("projectTasks:get", projectTasks);
  }

  @SubscribeMessage("projectTasks:post")
  async handleProjectTaskPost(@MessageBody() task: Prisma.ProjectTasksCreateManyInput, @ConnectedSocket() client: Socket ): Promise<void> {
      const projectNewTask = await this.projectTasksService.createProjectTask(task);
      const idProject = await this.getProjectInfo(client);
      this.server.in(idProject).emit("projectTasks:post", projectNewTask);
  }

  @SubscribeMessage("projectTasks:patch")
  async handleProjectTaskPatch(@MessageBody() task: Prisma.ProjectTasksUncheckedUpdateWithoutProjectInput, @ConnectedSocket() client: Socket ): Promise<void> {
    const projectUpdateTask = await this.projectTasksService.updateProjectTask(task);
    const idProject = await this.getProjectInfo(client);
    this.server.in(idProject).emit("projectTasks:patch", projectUpdateTask);
  }

  @SubscribeMessage("projectTasksStatus:patch")
  async handleProjectTaskStatusPatch(@MessageBody() task: Prisma.ProjectTasksUncheckedUpdateWithoutProjectInput, @ConnectedSocket() client: Socket ): Promise<void> {
    const projectUpdateTaskStatus = await this.projectTasksService.updateProjectTaskStatus(task);
    const idProject = await this.getProjectInfo(client);
    this.server.in(idProject).emit("projectTasksStatus:patch", projectUpdateTaskStatus);
  }

  @SubscribeMessage("projectTasks:delete")
  async handleMessageDelete(@MessageBody() id_task: number, @ConnectedSocket() client: Socket ): Promise<void>  {
    const projectDeleteTask = await this.projectTasksService.deleteProjectTask(id_task);
    const idProject = await this.getProjectInfo(client);
    this.server.in(idProject).emit("projectTasks:delete", projectDeleteTask);
  }

  afterInit(server: Server) {
    console.log(server);
  }

  handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    const id_project = client.handshake.auth.id_group_project;
    console.log("ID(handleConnection): ", id_project);
    client.join(id_project);
    client.on("disconnecting", () => {
      console.log("ID(disconnecting): ", id_project);
      client.leave(String(id_project));
    });
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const id_project = client.handshake.auth.id_group_project;
    console.log("ID(handleDisconnect): ", id_project);
    client.leave(String(id_project));
  }
}