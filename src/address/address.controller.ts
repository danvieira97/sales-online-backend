import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDTO } from './dtos/create-address.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { UserId } from 'src/decorators/user-id.decorator';
import { ReturnAddressDTO } from './dtos/return-address.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body()
    createAddressDTO: CreateAddressDTO,
    @UserId() userId: number,
  ) {
    return await this.addressService.createAddress(createAddressDTO, userId);
  }

  @Get()
  @UsePipes(ValidationPipe)
  async getAddressByUserId(
    @UserId() userId: number,
  ): Promise<ReturnAddressDTO[]> {
    return (await this.addressService.getAddressByUserId(userId)).map(
      (address) => new ReturnAddressDTO(address),
    );
  }
}
