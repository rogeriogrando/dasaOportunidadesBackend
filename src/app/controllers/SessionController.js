import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import Users from '../models/Users';
import authConfig from '../../config/auth';
import Mail from '../../lib/Mail';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      pass: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Campos com informações incorretas.' });
    }
    const { email, pass } = req.body;

    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Email ou Senha incorretos!' });
    }

    if (!(await user.checkPassword(pass))) {
      return res.status(401).json({ error: 'Email ou Senha incorretos!' });
    }

    const { id, name, category, active } = user;

    if (active === false) {
      return res.status(401).json({ error: 'Verifique seu e-mail!' });
    } else {
      return res.json({
        user: { id, name, email, category },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    }
  }
}

export default new SessionController();
