import { NestFactory } from '@nestjs/core';
import { RegModule } from './register.server/modules/reg.modules';
import { AuthModule } from './auth.server/modules/auth.module';
import { UsersModule } from './users.server/modules/users.modules';
import { Logger } from '@nestjs/common';
import { JwtMiddleware } from './utils/jwt.middleware';

// вход в приложение

async function bootstrap() {
  const appAuth = await NestFactory.create(AuthModule, { cors: true });
  const appRegister = await NestFactory.create(RegModule, { cors: true });
  const appUsersInfo = await NestFactory.create(UsersModule , { cors: true });

  const logger = new Logger();


  appAuth.useLogger(logger);
  appRegister.useLogger(logger);
  appUsersInfo.useLogger(logger);

  appUsersInfo.use(new JwtMiddleware().use); // middleware для расшивровки токена и извлечения из него user_id
  


  await Promise.all([
    appAuth.listen(4199), // сервис отвечает за авторизацию
    appRegister.listen(4201), // сервис отвечает за регистрацию
    appUsersInfo.listen(4202), // сервис отвечает за всю информацию о пользователе 
  ]);

  logger.log('Both applications are running');
}

bootstrap();
