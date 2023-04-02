import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import {InjectModel} from "@nestjs/sequelize";
import {CreateFileDto} from "./dto/create-file.dto";
import {Files} from "./files.model";

@Injectable()
export class FilesService {
    constructor(@InjectModel(Files) private filesRepository: typeof Files) {}

    async createFile(dto: CreateFileDto): Promise<string> {

        try {
            const filename = uuid.v4() + '.jpg';
            const dirPath = path.resolve(__dirname, '../..', 'static');
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, {recursive: true});
            }
            const filePath = path.join(dirPath, filename);
            this.writeFile(filePath, dto.file);
            await this.filesRepository.create({...dto, filePath: filePath});

            return filename;
        } catch (err) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async untieFile(essenceId, essenceTable) {
        const fileEssence = await this.filesRepository.update(
        {essenceId: null, essenceTable: null},
        {where: {essenceId: essenceId, essenceTable: essenceTable}}
        );

        return fileEssence;
    }

    async getFileByEssence(essenceId, essenceTable) {
        const fileEssence = await this.filesRepository.findOne({
            where: {essenceId: essenceId, essenceTable: essenceTable},
            include: {all: true}
        })
        console.log(fileEssence)

        return fileEssence;
    }

    async removeUnusedFiles() {
        try {
            const unusedFiles = await this.filesRepository.findAll(
                {where: {essenceId: null, essenceTable: null}}
            );

            unusedFiles.forEach(file => {
                fs.rmSync(file.filePath);
            })

            await this.filesRepository.destroy(
                {where: {essenceId: null, essenceTable: null}}
            );

            return unusedFiles;
        } catch (err) {
            throw new HttpException('Произошла ошибка при удлаении файла', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async removeOutdatedFiles() {
        try {
            const allFiles = await this.filesRepository.findAll();
            const removedFiles = [];

            for (let file of allFiles) {
                if (Date.now() - Number(file.createdAt) > 3600000) {
                    await this.filesRepository.destroy({where: {id: file.id}});
                    removedFiles.push(file);
                }
            }

            return removedFiles;
        } catch (err) {
            throw new HttpException('Произошла ошибка при удлаении файла', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    writeFile(filePath: string, file) {
        fs.writeFileSync(filePath, file.buffer);
    }
}
