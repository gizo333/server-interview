import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/auth.server/providers/prisma/prisma.service";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async SaveUserInfo(user_id: string, telegram: string, github: string, name: string, lastname:string, stack: string): Promise<string> {
        try {
            if (!user_id) {
                throw new NotFoundException("Не указан user_id.");
            }
            const updatedUser = await this.prisma.user.update({
                where: { user_id },
                data: {
                    telegram,
                    github,
                    name,
                    lastname,
                    stack,
                },
            });

            if (!updatedUser) {
                throw new NotFoundException(`Пользователь с user_id ${user_id} не найден.`);
            }

            return `Информация о пользователе с user_id ${user_id} обновлена успешно.`;
        } catch (error) {
            console.error("Ошибка при сохранении информации о пользователе:", error);
            throw new NotFoundException("Не удалось сохранить информацию о пользователе.");
        }
    }
}
