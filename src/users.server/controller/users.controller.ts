// users.controller.ts
import { Controller, Post, Body, Request, UseGuards, HttpCode, HttpException } from '@nestjs/common';
import { JwtMiddleware } from '../../utils/jwt.middleware'; 
import { UsersService } from '../providers/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}



  @UseGuards(JwtMiddleware)
  @Post('save-info')
  @HttpCode(200)
  async saveUserInfo(@Request() req, @Body() body: { telegram: string, github: string, name: string, lastname: string, stack: string }): Promise<string> {
    try {
      

      const { user_id } = req.user;
      const { telegram } = body;
      const { github } = body;
      const { name } = body;
      const { lastname } = body;
      const { stack } = body;

      console.log('Received Request:', {
        user_id,
        telegram,
        github,
        headers: req.headers,
        body,
      });

      const result = await this.usersService.SaveUserInfo(user_id, telegram, github, name, lastname, stack);
      return result;
    } catch (error) {
      console.error('Ошибка:', error);
      throw new HttpException('Не удалось обновить информацию о пользователе.', 400);
    }
  }
}
