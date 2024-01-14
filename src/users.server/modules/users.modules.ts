import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { PrismaService } from '../../auth.server/providers/prisma/prisma.service';
import { UsersService } from '../providers/users.service';
import { UsersController } from '../controller/users.controller'; 
import { infoUsersController } from '../controller/infoUsers.controller';
import { infoUsersService } from '../providers/infoUsers.service';
import { deleteInfoController } from '../controller/deleteInfo.controller';
import { DeleteInfoService } from '../providers/deleteInfo.service';

@Module({
    controllers: [UsersController, infoUsersController, deleteInfoController],
    providers: [PrismaService, UsersService, infoUsersService, DeleteInfoService],
  })
  export class UsersModule {}