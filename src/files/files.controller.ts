import {Controller, Delete, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {Files} from "./files.model";
import {FilesService} from "./files.service";

@Controller('files')
export class FilesController {
    constructor(private filesService: FilesService) {}
    @ApiOperation({summary: 'Удалить неиспользуемые файлы'})
    @ApiResponse({status: 200, type: Files})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete('/unused')
    removeUnusedFiles() {
        return this.filesService.removeUnusedFiles();
    }

    @ApiOperation({summary: 'Удалить неиспользуемые файлы'})
    @ApiResponse({status: 200, type: Files})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete('/outdated')
    removeOutdatedFiles() {
        return this.filesService.removeOutdatedFiles();
    }
}
