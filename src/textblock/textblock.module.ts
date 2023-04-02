import { Module } from '@nestjs/common';
import {TextblockService} from "./textblock.service";
import {TextblockController} from "./textblock.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {TextBlock} from "./textblock.model";
import {FilesModule} from "../files/files.module";
import {AuthModule} from "../auth/auth.module";

@Module({
    providers: [TextblockService],
    controllers: [TextblockController],
    imports: [
        SequelizeModule.forFeature([TextBlock]),
        FilesModule,
        AuthModule
    ]
})
export class TextblockModule {}
