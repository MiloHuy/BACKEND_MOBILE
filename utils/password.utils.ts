import bcrypt from 'bcrypt';

const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
}

const isMatch = (encryptedPassword: string, password: string): Promise<boolean> => {
  return bcrypt.compare(password, encryptedPassword);
}

export {
  hashPassword,
  isMatch
};

