// app.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './models/user.model';
import { AuthGuard } from './auth/auth.guard';

@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('add-user')
  async addUser(@Body() userData: User): Promise<User> {
    return this.appService.addUser(userData);
  }

  @Get('get-user/:id')
  @UseGuards(AuthGuard)
  async getUser(@Param('id') id: string): Promise<User> {
    return this.appService.getUser(parseInt(id, 10));
  }
}
