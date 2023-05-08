import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReturnCategoryDTO } from './dtos/return-category.dto';
import { CategoryService } from './category.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDTO } from './dtos/create-category.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getAllCategories(): Promise<ReturnCategoryDTO[]> {
    return (await this.categoryService.getAllCategories()).map(
      (category) => new ReturnCategoryDTO(category),
    );
  }

  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createCategory(
    @Body() createCategoryDTO: CreateCategoryDTO,
  ): Promise<CategoryEntity> {
    return await this.categoryService.createCategory(createCategoryDTO);
  }
}
