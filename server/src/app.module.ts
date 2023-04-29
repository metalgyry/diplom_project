import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma/prisma.service";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { CoursesModule } from './courses/courses.module';
import { SubTasksModule } from "./subtasks/subtasks.module";
import { ProjectsModule } from "./projects/projects.module";
import { GroupsModule } from './groups/groups.module';


@Module({
    controllers: [ AppController, ],
    providers: [ AppService, PrismaService, ],
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: "../.env",
        }),
        UsersModule,
        AuthModule,
        TasksModule,
        SubTasksModule,
        CoursesModule,
        ProjectsModule,
        GroupsModule,
    ],
    exports: [ PrismaService ]
})
export class AppModule {

}