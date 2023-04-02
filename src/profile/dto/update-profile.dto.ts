import {IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {CreateUserDto} from "../../users/dto/create-user.dto";
import {UpdateUserDto} from "../../users/dto/update-user.dto";

export class UpdateProfileDto {
    @IsString({message: 'Должно быть строкой'})
    readonly name: string;

    @IsString({message: 'Должно быть строкой'})
    readonly phone: string;

    userDto: UpdateUserDto;
}