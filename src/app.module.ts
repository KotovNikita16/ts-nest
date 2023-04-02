import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRole} from "./roles/user-role.model";
import { AuthModule } from './auth/auth.module';
import { TextblockModule } from './textblock/textblock.module';
import {TextBlock} from "./textblock/textblock.model";
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { ProfileModule } from './profile/profile.module';
import * as path from 'path';
import {Profile} from "./profile/profile.model";

@Module({
    controllers: [], //регистрация контроллера
    providers: [], //инжектирование сервиса в модуль
    //импортирование модуля БД
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRole, TextBlock, Profile], //Обязательно добавлять новые модели
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        TextblockModule,
        FilesModule,
        ProfileModule,
    ]
})
export class AppModule {}