import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body()
    hoidanit: CreateUserDto,

    // => const hoidanit: CureateUserDto = req.body
  ) {
    return this.usersService.create(hoidanit);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
    // =>const id: string = req.params.id
  ) {
    return this.usersService.findOne(id);
  }

  @Patch()
  update(
    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
