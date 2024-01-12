// src/app.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../../auth.server/providers/prisma/prisma.service';
import { RegService } from '../providers/reg.service';
import { RegController } from '../controller/reg.controller'; 

@Module({
  controllers: [RegController],
  providers: [PrismaService, RegService],
})
export class RegModule {}
