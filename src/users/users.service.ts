import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { async } from 'rxjs';
const bcrypt = require('bcryptjs');

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getHsashPassword(password: string) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync('B4c0//', salt);
    return hash;
  }

  async create(hoidanit: CreateUserDto) {
    const hashPassword = await this.getHsashPassword(hoidanit.password);
    const user = await this.userModel.create({
      name: hoidanit.name,
      email: hoidanit.email,
      address: hoidanit.address,
      password: hashPassword,
    });
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return 'Not found user';
      }
      return this.userModel.findOne({
        _id: id,
      });
    } catch (error) {
      console.log('>>> err', error);
      return 'Not found user';
    }
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      {
        _id: updateUserDto._id,
      },
      {
        ...updateUserDto,
      },
    );
  }

  async remove(id: string) {
    return await this.userModel.deleteOne({
      _id: id,
    });
  }
}
