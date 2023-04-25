import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { userEntityMock } from 'src/user/__mocks__/user.mock';
import { JwtService } from '@nestjs/jwt';
import { jwtMock } from '../__mocks__/jwt.mock';
import { loginUserMock } from '../__mocks__/login-user.mock';
import { ReturnUserDTO } from 'src/user/dtos/return-user.dto';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            getUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => jwtMock,
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return user if password and email valid', async () => {
    const user = await service.login(loginUserMock);

    expect(user).toEqual({
      accessToken: jwtMock,
      user: new ReturnUserDTO(userEntityMock),
    });
  });

  it('should return user if password invalid and email valid', async () => {
    expect(
      service.login({ ...loginUserMock, password: '4321' }),
    ).rejects.toThrowError();
  });

  it('should return user if email not exist', async () => {
    jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(undefined);

    expect(service.login(loginUserMock)).rejects.toThrowError();
  });

  it('should return error in UserService', async () => {
    jest.spyOn(userService, 'getUserByEmail').mockRejectedValue(new Error());

    expect(service.login(loginUserMock)).rejects.toThrowError();
  });
});
