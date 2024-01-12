import * as bcrypt from 'bcrypt';

async function hashPassword(plainPassword: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
}

export default hashPassword;
