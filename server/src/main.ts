import 'reflect-metadata';
import { NestFactory } from "@nestjs/core/nest-factory";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function start() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API description')
    .setVersion('0.1')
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    const configService = app.get(ConfigService);
    app.enableCors({
        origin: `${configService.get("CLIENT_URL")}${configService.get("CLIENT_PORT")}`,
        credentials: true,
    });
    app.useGlobalPipes(new ValidationPipe());

    const PORT = configService.get('SERVER_PORT') || 5000;
    app.use(cookieParser());

    await app.listen(PORT, () => { console.log(`Server started on ${PORT}`); });
}

start();