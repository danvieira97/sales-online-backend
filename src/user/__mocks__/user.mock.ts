import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '123543543',
  createdAt: new Date(),
  email: 'emailmock@emali.com',
  id: 43242,
  name: 'nameMock',
  password: '$2b$10$8LYq7kNfYeDeeundcKC41uBgXwhurbAUsFoTGrkYAWAjgkjBibnVK',
  phone: '321532523532',
  typeUser: UserType.User,
  updatedAt: new Date(),
};
