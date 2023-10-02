import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // thuộc tính name là định danh 1 cái id ứng mới modal User, k phải trong bảng User
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
