import {forwardRef, Module} from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Files} from "./files.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [FilesService],
  controllers: [FilesController],
  imports: [
      SequelizeModule.forFeature([Files]),
      AuthModule
  ],
  exports: [FilesService]
})
export class FilesModule {}
