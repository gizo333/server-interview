
import { Module } from '@nestjs/common';
import { PrismaService } from '../providers/prisma/prisma.service';
import { AuthService } from '../providers/auth.service';
import { AuthController } from '../controller/auth.controller'; // Импортируйте ваш AuthController

@Module({
  controllers: [AuthController],
  providers: [PrismaService, AuthService],
})
export class AuthModule {}
