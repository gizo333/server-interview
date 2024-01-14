import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../auth.server/providers/prisma/prisma.service';

@Injectable()
export class DeleteInfoService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserData(user_id: string) {
    return await this.prisma.user.findUnique({
      where: {
        user_id,
      },
      select: { stack: true },
    });
  }

  async updateStack(user_id: string, stackArray: string[]) {
    try {
      // Преобразовать обновленный массив в строку
      const updatedStack = stackArray.join(',');
  
      // Обновление данных пользователя
      await this.prisma.user.update({
        where: {
          user_id,
        },
        data: { stack: updatedStack },
      });
    } catch (error) {
      console.error('Ошибка при обновлении стека:', error.message);
      throw new Error('Внутренняя ошибка сервера');
    }
  }
  

  async removeStack(user_id: string, index: number) {
    try {
      const userData = await this.getUserData(user_id);

      if (!userData) {
        throw new Error('Пользователь не найден');
      }

      // Преобразовать строку в массив, если это не массив
      const userStack: string[] = Array.isArray(userData.stack) ? userData.stack : [userData.stack];

      // Ваша логика для удаления элемента стека
      userStack.splice(index, 1);

      // Преобразовать обратно в строку
      const updatedStack = userStack.join(',');

      // Проверить, что строка не является пустой
      const stackUpdate = updatedStack !== '' ? updatedStack : null;

      console.log('Отправка на сервер:', stackUpdate);

      // Сохраните обновленные данные
      await this.prisma.user.update({
        where: {
          user_id,
        },
        data: { stack: stackUpdate },
      });

      return { success: true, message: 'Элемент стека успешно удален.' };
    } catch (error) {
      console.error('Ошибка при удалении стека:', error.message);
      throw new Error('Внутренняя ошибка сервера');
    }
  }
}
