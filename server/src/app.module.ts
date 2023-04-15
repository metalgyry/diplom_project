import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: "../.env",
        }),
    ],
    exports: []
})
export class AppModule {

}