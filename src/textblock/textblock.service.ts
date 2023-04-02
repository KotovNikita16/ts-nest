import { Injectable } from '@nestjs/common';
import {CreateTextBlockDto} from "./dto/create-textblock.dto";
import {InjectModel} from "@nestjs/sequelize";
import {TextBlock} from "./textblock.model";
import {FilesService} from "../files/files.service";

@Injectable()
export class TextblockService {

    constructor(@InjectModel(TextBlock) private textblockRepository: typeof TextBlock,
                private fileService: FilesService) {}

    async create(dto: CreateTextBlockDto, image) {
        const fileName = await this.fileService.createFile(image);
        const textblock = await this.textblockRepository.create({...dto, image: fileName});
        return textblock;
    }

    async getAll(dto: CreateTextBlockDto, image) {
        const fileName = await this.fileService.createFile(image);
        const textblock = await this.textblockRepository.create({...dto, image: fileName});
        return textblock;
    }

    async update(dto: CreateTextBlockDto, image) {
        const fileName = await this.fileService.createFile(image);
        const textblock = await this.textblockRepository.create({...dto, image: fileName});
        return textblock;
    }

    async delete(dto: CreateTextBlockDto, image) {
        const fileName = await this.fileService.createFile(image);
        const textblock = await this.textblockRepository.create({...dto, image: fileName});
        return textblock;
    }
}
