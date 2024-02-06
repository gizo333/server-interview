
import { Controller, Post, Body, HttpCode, HttpException } from '@nestjs/common';
import { AuthService } from '../providers/auth.service';
import { Logger } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private logger = new Logger(AuthController.name);

  @Post('login')
  @HttpCode(222) 
  async login(@Body() body: { email: string, password: string }): Promise<{ token: string }> {
    const { email, password } = body;

    try {
      const token = await this.authService.login(email, password);
      return { token };
    } catch (error) {
      throw new HttpException('Неверное имя пользователя или пароль', 421); 
    }
  }
}
