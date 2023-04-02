//Запуск сервера

import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {ValidationPipe} from "./pipes/validation.pipe";

async function start() {
    const PORT = process.env.PORT || 5000;
    //создаем сервер на основе AppModule
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('NestJS TypeScript server')
        .setDescription('JWT авторизация + текстовый блок + работа с файловым модулем')
        .setVersion('1.0.0')
        .addTag('Kotov Nikita')
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

start()