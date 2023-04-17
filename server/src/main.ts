import 'reflect-metadata';
import { NestFactory } from "@nestjs/core/nest-factory";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function start() {
    const PORT = process.env.SERVER_PORT || 5000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API description')
    .setVersion('0.1')
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(PORT, () => { console.log(`Server started on ${PORT}`); });
}

start();