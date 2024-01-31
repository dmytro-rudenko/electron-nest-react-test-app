import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user.model';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    }),
    SequelizeModule.forFeature([User]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
