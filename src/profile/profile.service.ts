import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Profile} from "./profile.model";
import {CreateProfileDto} from "./dto/create-profile.dto";
import {AuthService} from "../auth/auth.service";
import {UsersService} from "../users/users.service";
import {DeleteProfileDto} from "./dto/delete-profile.dto";
import {BanUserDto} from "../users/dto/ban-user.dto";
import {UpdateProfileDto} from "./dto/update-profile.dto";

@Injectable()
export class ProfileService {
    constructor(@InjectModel(Profile) private profileRepository: typeof Profile,
                private authService: AuthService,
                private userService: UsersService) {}
    async createUser(dto: CreateProfileDto) {
        const user = await this.authService.registration(dto.userDto);
        const profile = this.profileRepository.create({...dto, userId: user.id});
        return {user, ...profile};
    }

    async updateUser(dto: UpdateProfileDto) {
        const user = await this.userService.getUsersByLogin(dto.userDto.login);
        if (user) {
            await this.userService.updateUser(dto.userDto);

            await this.profileRepository.update(
                {phone: dto.phone, name: dto.name},
                {where: {userId: user.id}}
            );
            return (dto);
        }
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    async deleteUser(dto: DeleteProfileDto) {
        const user = await this.userService.getUsersByLogin(dto.login);
        await this.profileRepository.destroy({where: {id: user.id}});
        await this.userService.deleteUserByLogin(dto.login);
        return (`Пользователь ${user} успешно удален`);
    }

    async banUser(dto: BanUserDto) {
        const user = await this.profileRepository.findOne({where: {userId: dto.userId}});
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return {user};
    }
}
