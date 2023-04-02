import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRole} from "../roles/user-role.model";

//значения, которые по умолчанию будут заданы при создании нового User
interface TextBlockCreationAttrs {
    tag: string;
    title: string;
    content: string;
    image: string;
    group: string;
}

@Table({tableName: "textblock"})
export  class TextBlock extends Model<TextBlock, TextBlockCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.BIGINT, unique: true, autoIncrement: true, primaryKey: true})
    id: bigint;

    @ApiProperty({example: 'main-hero-text', description: 'Уникальное название для поиска'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    tag: string;

    @ApiProperty({example: 'Привет, герой!', description: 'Название текстового блока'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty({example: 'Не пропусти акцию!', description: 'Текст'})
    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @ApiProperty({description: 'Изображение'})
    @Column({type: DataType.STRING})
    image: string;

    @ApiProperty({example: 'main-page', description: 'Какие блоки будут отображать информацию'})
    @Column({type: DataType.STRING, allowNull: true})
    group: string;
}