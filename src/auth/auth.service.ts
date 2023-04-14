import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dtos/login.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ReturnLoginDTO } from './dtos/return-login.dto';
import { LoginPayloadDTO } from './dtos/login-payload.dto';
import { ReturnUserDTO } from 'src/user/dtos/return-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<ReturnLoginDTO> {
    const user: UserEntity | undefined = await this.userService
      .getUserByEmail(loginDTO.email)
      .catch(() => undefined);

    const isMatch = await compare(loginDTO.password, user?.password || '');

    if (!user || !isMatch) {
      throw new NotFoundException(`email or password incorrect`);
    }

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayloadDTO(user) }),
      user: new ReturnUserDTO(user),
    };
  }
}
