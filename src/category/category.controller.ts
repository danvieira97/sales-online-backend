import { Controller, Get } from '@nestjs/common';
import { ReturnCategoryDTO } from './dtos/return-category.dto';
import { CategoryService } from './category.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';

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
}
