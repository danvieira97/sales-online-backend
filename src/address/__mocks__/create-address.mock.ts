import { cityMock } from 'src/city/__mocks__/city.mock';
import { CreateAddressDTO } from '../dtos/create-address.dto';
import { addressMock } from './address.mock';

export const createAddressMock: CreateAddressDTO = {
  cep: addressMock.cep,
  cityId: cityMock.id,
  complement: addressMock.complement,
  numberAddress: addressMock.numberAddress,
};
