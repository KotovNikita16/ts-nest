import {ApiProperty} from "@nestjs/swagger";
import {IsString, Length} from "class-validator";

export class UpdateUserDto {
    @ApiProperty({example: 'login', description: 'Логин пользователя'})
    @IsString({message: 'Должно быть строкой'})
    readonly login: string;

    @ApiProperty({example: 'login', description: 'Новый логин пользователя'})
    @IsString({message: 'Должно быть строкой'})
    readonly newLogin: string;

    @ApiProperty({example: '1234', description: 'Новый пароль пользователя'})
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16 символов'})
    readonly password: string;
}