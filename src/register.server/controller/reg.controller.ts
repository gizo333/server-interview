import { Controller, Post, Body } from '@nestjs/common';
import { RegService } from '../providers/reg.service';
import { Logger } from '@nestjs/common';

@Controller('reg')
export class RegController {
  constructor(private readonly regService: RegService) {}
  private logger = new Logger(RegController.name);

  @Post('/register')
  async register(@Body() body: { email: string, password: string }): Promise<string> {
    this.logger.log('Received login request:', body);
    const { email, password } = body;
    return this.regService.register(email, password);
  }
}