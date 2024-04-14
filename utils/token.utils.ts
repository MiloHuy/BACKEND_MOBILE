import jwt from 'jsonwebtoken';

const generateAccessToken = (payload: any) => {
  const token = jwt.sign(payload, process.env.TOKEN_SECRET || 'token_secret', {
    expiresIn: '2h',
  });
  return token;
}

const generateRefreshToken = (payload: any) => {
  const token = jwt.sign(payload, process.env.TOKEN_SECRET || 'token_secret', {
    expiresIn: '3d',
  });
  return token;
}

export {
  generateAccessToken,
  generateRefreshToken
};

