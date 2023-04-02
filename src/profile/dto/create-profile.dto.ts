import {IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {CreateUserDto} from "../../users/dto/create-user.dto";

export class CreateProfileDto {
    @IsString({message: 'Должно быть строкой'})
    readonly name: string;

    @IsString({message: 'Должно быть строкой'})
    readonly phone: string;

    userDto: CreateUserDto;
}