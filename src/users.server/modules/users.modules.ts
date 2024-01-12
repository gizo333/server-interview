import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { PrismaService } from '../../auth.server/providers/prisma/prisma.service';
import { UsersService } from '../providers/users.service';
import { UsersController } from '../controller/users.controller'; 
import { JwtMiddleware } from '../../utils/jwt.middleware'; 

@Module({
    controllers: [UsersController],
    providers: [PrismaService, UsersService],
  })
  export class UsersModule {}