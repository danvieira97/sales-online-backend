import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dtos/login.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginDTO: LoginDTO): Promise<UserEntity> {
    const user: UserEntity | undefined = await this.userService
      .getUserByEmail(loginDTO.email)
      .catch(() => undefined);

    const isMatch = await compare(loginDTO.password, user?.password || '');

    if (!user || !isMatch) {
      throw new NotFoundException(`email or password incorrect`);
    }

    return user;
  }
}
