import {Body, Controller, Delete, Get, Post, Put, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {ProfileService} from "./profile.service";
import {CreateProfileDto} from "./dto/create-profile.dto";
import {UsersService} from "../users/users.service";
import {DeleteProfileDto} from "./dto/delete-profile.dto";
import {RolesGuard} from "../auth/roles.guard";
import {AdminLoginAuthGuard} from "../auth/admin-login-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {BanUserDto} from "../users/dto/ban-user.dto";
import {UpdateProfileDto} from "./dto/update-profile.dto";
@ApiTags('Пользователи')
@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService,
                private userService: UsersService) {}
    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post('/registration')
    create(@Body() userDto: CreateProfileDto) {
        return this.profileService.createUser(userDto);
    }

    @ApiOperation({summary: 'Удаление пользователя'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(AdminLoginAuthGuard)
    @Put()
    update(@Body() updateProfileDto: UpdateProfileDto) {
        return this.profileService.updateUser(updateProfileDto);
    }

    @ApiOperation({summary: 'Удаление пользователя'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(AdminLoginAuthGuard)
    @Delete()
    delete(@Body() deleteProfileDto: DeleteProfileDto) {
        return this.profileService.deleteUser(deleteProfileDto);
    }

    @ApiOperation({summary: 'Забанить пользователя'})
    @ApiResponse({status: 200, type: [User]})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/ban')
    banUser(@Body() banUserDto: BanUserDto) {
        return this.profileService.banUser(banUserDto);
    }
}
