import {
    Body,
    Controller,
    Delete,
    Get, HttpStatus,
    ParseFilePipeBuilder,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CreateTextBlockDto} from "./dto/create-textblock.dto";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {TextblockService} from "./textblock.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {DeleteTextblockDtoTextBlockDto} from "./dto/delete-textblock.dto";
import {GetTextblockDtoTextBlockDto} from "./dto/get-textblocks.dto";
import {UpdateTextBlockDto} from "./dto/update-textblock.dto";

@Controller('textblock')
export class TextblockController {

    constructor(private textblockService: TextblockService) {}

    @Get()
    getTextBlock(@Body() dto: GetTextblockDtoTextBlockDto) {
        return this.textblockService.getTextblocks(dto);
    }

    @UseInterceptors(FileInterceptor('image'))
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Put()
    updateTextBlock(@Body() dto: UpdateTextBlockDto,
                    @UploadedFile(
                        new ParseFilePipeBuilder()
                            .addFileTypeValidator({
                                fileType: "jpg|jpeg|png"
                            })
                            .build({
                                fileIsRequired: false,
                            })
                    ) image) {
        return this.textblockService.update(dto, image);
    }

    @UseInterceptors(FileInterceptor('image'))
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    createTextBlock(@Body() dto: CreateTextBlockDto,
                    @UploadedFile() image) {
        return this.textblockService.create(dto, image);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete()
    deleteTextBlock(@Body() dto: DeleteTextblockDtoTextBlockDto) {
        console.log(dto.id)
        return this.textblockService.delete(dto.id);
    }
}
