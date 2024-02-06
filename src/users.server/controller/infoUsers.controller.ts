import { Controller, Get, Request, UseGuards, HttpException } from '@nestjs/common';
import { JwtMiddleware } from '../../utils/jwt.middleware'; 
import { infoUsersService } from '../providers/infoUsers.service';

@Controller('users')
export class infoUsersController {
  constructor(private readonly infoUsersService: infoUsersService) {}

  @UseGuards(JwtMiddleware)
  @Get('info')
  async getUserInfo(@Request() req) {
    try {
      const { user_id } = req.user;

    
      const userInfo = await this.infoUsersService.getUserInfo(user_id);

      return userInfo;
    } catch (error) {
      console.error('Ошибка при получении информации о пользователе:', error);
      throw new HttpException('Не удалось получить информацию о пользователе.', 400);
    }
  }
}
