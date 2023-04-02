import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateTextBlockDto} from "./dto/create-textblock.dto";
import {InjectModel} from "@nestjs/sequelize";
import {TextBlock} from "./textblock.model";
import {FilesService} from "../files/files.service";
import {GetTextblockDtoTextBlockDto} from "./dto/get-textblocks.dto";
import {UpdateTextBlockDto} from "./dto/update-textblock.dto";

@Injectable()
export class TextblockService {

    constructor(@InjectModel(TextBlock) private textblockRepository: typeof TextBlock,
                private fileService: FilesService) {}

    async create(dto: CreateTextBlockDto, image) {
        try{
            const textblock = await this.textblockRepository.create(dto);
            const fileName = await this.fileService.createFile({
                file: image,
                essenceTable: 'textblock',
                essenceId: textblock.id
            });
            return {...dto, fileName};
        } catch (err) {
            throw new HttpException('Ошибка записи текстового блока', HttpStatus.BAD_REQUEST);
        }
    }
    async getTextblocks(dto: GetTextblockDtoTextBlockDto) {
        if (dto.group) {
            return await this.textblockRepository.findAll({where: {group: dto.group}});
        }

        return await this.textblockRepository.findAll();
    }

    async update(dto: UpdateTextBlockDto, image) {
        try{
            const textblock = await this.textblockRepository.update(
                {tag: dto.tag, content: dto.content, title: dto.title, group: dto.group},
                {where: {id: dto.id}});

            let essenceFile = await this.fileService.getFileByEssence(dto.id, 'textblock');
            let fileName: string;

            if (image) {
                if (essenceFile) {
                    fileName = essenceFile.filePath;
                    this.fileService.writeFile(fileName, image);
                } else {
                    fileName = await this.fileService.createFile({
                        file: image,
                        essenceTable: 'textblock',
                        essenceId: dto.id
                    });
                }
            }

            return {...dto, fileName};
        } catch (err) {
            throw new HttpException('Ошибка записи текстового блока', HttpStatus.BAD_REQUEST);
        }
    }

    async delete(textblockId: bigint) {
        try {
            const textblock = await this.textblockRepository.findByPk(textblockId);
            const fileEssence = await this.fileService.untieFile(textblock.id, 'textblock');

            return await this.textblockRepository.destroy({where: {id: textblockId}});
        } catch (err) {
            throw new HttpException("Не удалось удалить текстовый блок", HttpStatus.BAD_REQUEST);
        }
    }
}
