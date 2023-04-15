import 'reflect-metadata';
import { NestFactory } from "@nestjs/core/nest-factory";
import { AppModule } from "./app.module";

async function start() {
    const PORT = process.env.SERVER_PORT || 5000;
    const app = await NestFactory.create(AppModule);

    await app.listen(PORT, () => { console.log(`Server started on ${PORT}`); });
}

start();