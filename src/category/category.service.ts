import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getAllCategories(): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.find();

    if (!categories || categories.length === 0) {
      throw new NotFoundException('No categories found');
    }

    return categories;
  }

  async createCategory(
    createCategoryDTO: CreateCategoryDTO,
  ): Promise<CategoryEntity> {
    const category = await this.getCategoryByName(createCategoryDTO.name).catch(
      () => undefined,
    );

    if (category) {
      throw new BadRequestException(`Category ${category.name} alredy exists`);
    }

    return await this.categoryRepository.save(createCategoryDTO);
  }

  async getCategoryByName(name: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: { name: name },
    });

    if (!category) {
      throw new NotFoundException(`Category ${name} not found`);
    }

    return category;
  }
}