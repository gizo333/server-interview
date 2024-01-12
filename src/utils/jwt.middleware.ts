import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import createToken from './createJwt';

interface DecodedUser {
  user_id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedUser;
    }
  }
}

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const decoded = jwt.verify(token, 'your-secret-key') as { id: string };

        req.user = { user_id: decoded.id };
      } catch (error) {
        console.error('Ошибка при верификации токена:', error);
      }
    }

    next();
  }
}


