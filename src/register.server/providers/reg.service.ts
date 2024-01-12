import {Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from 'src/auth.server/providers/prisma/prisma.service';
import  hashPassword  from 'src/utils/hashPassword';
import  createToken  from 'src/utils/createJwt';

@Injectable()
export class RegService {
  constructor(private prisma: PrismaService) {}

  async register(email: string, password: string): Promise<string> {
    const existingUser = await this.prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      throw new NotFoundException('Пользователь с таким email уже существует');
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return createToken(newUser);
  }
}