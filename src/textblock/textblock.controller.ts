import {Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {CreateTextBlockDto} from "./dto/create-textblock.dto";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {TextblockService} from "./textblock.service";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('textblock')
export class TextblockController {

    constructor(private textblockService: TextblockService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    createTextBlock(@Body() dto: CreateTextBlockDto,
                    @UploadedFile() image) {
        return this.textblockService.create(dto, image)
    }

}
