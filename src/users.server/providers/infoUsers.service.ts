import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../auth.server/providers/prisma/prisma.service';

@Injectable()
export class infoUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserInfo(user_id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id,
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден.');
    }

    // Возвращаем только необходимые поля, включая stack
    const {stack } = user;

    return {
      stack,
    };
  }
}
