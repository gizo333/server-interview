import * as jwt from 'jsonwebtoken';

// создание токена и запихивание чего захотим
function createToken(user: { user_id: string }): string {
  const tokenPayload = {
    id: user.user_id,
  };

  const secretKey = 'your-secret-key';
  const expiresInMinutes = 120;

  const token = jwt.sign(tokenPayload, secretKey, {
    expiresIn: `${expiresInMinutes}m`,
  });

  

  return token;
}

export default createToken;
