import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';
import Users from '../models/Users';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Acesso negado.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    const user = await Users.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'Acesso negado.' });
    }

    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Acesso negado.' });
  }
};
