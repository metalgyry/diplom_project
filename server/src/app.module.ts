import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma/prisma.service";


@Module({
    controllers: [ AppController, ],
    providers: [ AppService, PrismaService, ],
    imports: [
        ConfigModule.forRoot({
            envFilePath: "../.env",
        }),
    ],
    exports: [ PrismaService ]
})
export class AppModule {

}