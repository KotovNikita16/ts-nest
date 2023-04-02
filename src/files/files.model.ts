import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

//значения, которые по умолчанию будут заданы при создании нового User
interface FilesCreationAttrs {
    filePath: string;
    essenceTable: string;
    essenceId: bigint;
}

@Table({tableName: "file"})
export class Files extends Model<Files, FilesCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.BIGINT, unique: true, autoIncrement: true, primaryKey: true})
    id: bigint;

    @ApiProperty({example: 'C:\\fileRepository\\filename.jpg', description: 'Путь, по которому хранится файл'})
    @Column({type: DataType.STRING, allowNull: false})
    filePath: string;

    @ApiProperty({example: 'true', description: 'Забанен пользователь или нет'})
    @Column({type: DataType.STRING, allowNull: true})
    essenceTable: string;

    @ApiProperty({example: '1234', description: 'ID, где используется файл'})
    @Column({type: DataType.STRING, allowNull: true})
    essenceId: bigint;
}