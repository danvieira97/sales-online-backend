import { stateMock } from 'src/state/__mocks__/state.mock';
import { CityEntity } from '../entities/city.entity';

export const cityMock: CityEntity = {
  createdAt: new Date(),
  id: 123145,
  name: 'cityMock',
  stateId: stateMock.id,
  updatedAt: new Date(),
};
