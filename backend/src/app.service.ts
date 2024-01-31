// app.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async addUser(userData: User): Promise<User> {
    return this.userModel.create(userData);
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
