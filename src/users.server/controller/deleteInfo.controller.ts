import { Controller, Delete, Param, UseGuards, Req, InternalServerErrorException } from '@nestjs/common';
import { JwtMiddleware } from '../../utils/jwt.middleware'; 
import { DeleteInfoService } from '../providers/deleteInfo.service';


@Controller('users')
export class deleteInfoController {
  constructor(private readonly deleteInfoService: DeleteInfoService) {}

  @UseGuards(JwtMiddleware)
  @Delete('remove-stack/:index')
  async removeStack(@Param('index') index: number, @Req() req) {
    try {
      const { user_id } = req.user;
      const userData = await this.deleteInfoService.getUserData(user_id);
  
      if (!userData) {
        throw new Error('Пользователь не найден');
      }
  
      const stackArray = userData.stack ? userData.stack.split(',') : [];
      
     
      stackArray.splice(index, 1);
  
      
      await this.deleteInfoService.updateStack(user_id, stackArray);
  
      return { success: true, message: 'Элемент стека успешно удален.' };
    } catch (error) {
      console.error('Ошибка при удалении стека:', error.message);
      throw new InternalServerErrorException('Внутренняя ошибка сервера');
    }
  }
}  



