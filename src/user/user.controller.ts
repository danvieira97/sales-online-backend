import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return await this.userService.createUser(createUserDTO);
  }

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
}
