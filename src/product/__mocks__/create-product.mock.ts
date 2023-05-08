import { categoryMock } from 'src/category/__mocks__/category.mock';
import { CreateProductDTO } from '../dtos/create-product.dto';

export const createProductMock: CreateProductDTO = {
  categoryId: categoryMock.id,
  name: 'create product mock',
  image: 'http://image',
  price: 19.9,
};
