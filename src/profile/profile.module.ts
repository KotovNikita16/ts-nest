import {forwardRef, Module} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Profile} from "./profile.model";
import {UsersService} from "../users/users.service";
import {UsersModule} from "../users/users.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [
      forwardRef(() => UsersModule),
      forwardRef(() => AuthModule),
      SequelizeModule.forFeature([Profile, User])
  ]
})
export class ProfileModule {}
