import {ApiProperty} from "@nestjs/swagger";
import {IsString, Length} from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'login', description: 'Логин пользователя'})
    @IsString({message: 'Должно быть строкой'})
    readonly login: string;

    @ApiProperty({example: '1234', description: 'Пароль пользователя'})
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16 символов'})
    readonly password: string;
}