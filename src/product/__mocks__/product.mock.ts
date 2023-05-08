import { categoryMock } from 'src/category/__mocks__/category.mock';
import { ProductEntity } from '../entities/product.entity';

export const productMock: ProductEntity = {
  categoryId: categoryMock.id,
  createdAt: new Date(),
  id: 765,
  image: 'http://image.com',
  name: 'Product Mock name',
  price: 34.9,
  updatedAt: new Date(),
};
