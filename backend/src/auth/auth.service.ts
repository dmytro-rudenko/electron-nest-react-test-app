// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async login(signInDto: any) {
    const userData = await this.userModel.findOne({
      where: { username: signInDto.username },
    });

    if (!userData) {
      throw new NotFoundException('User not found');
    }

    const { dataValues: user } = userData;

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
