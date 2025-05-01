import * as jwt from 'jsonwebtoken';
import { User } from '../auth/auth.schema'; // adjust import to your User model

export const GetToken = (user: User) => {
  console.log('GetToken called', user);

  const payload = {
    id: user?._id,
    email: user?.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
};
