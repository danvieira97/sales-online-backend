import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { ReturnUserDTO } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return await this.userService.createUser(createUserDTO);
  }

  @Get()
  async getAllUsers() {
    return (await this.userService.getAllUsers()).map(
      (userEntity) => new ReturnUserDTO(userEntity),
    );
  }
}
