import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { ProductService } from './product.service';
import { ReturnProductDTO } from './dtos/return-product.dto';
import { CreateProductDTO } from './dtos/create-product.dto';
import { ProductEntity } from './entities/product.entity';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<ReturnProductDTO[]> {
    return (await this.productService.getAllProducts()).map(
      (product) => new ReturnProductDTO(product),
    );
  }

  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createProduct(
    @Body() createProductDTO: CreateProductDTO,
  ): Promise<ProductEntity> {
    return await this.productService.createProduct(createProductDTO);
  }
}
