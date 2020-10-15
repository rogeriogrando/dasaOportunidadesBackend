import * as Yup from 'yup';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import Users from '../models/Users';
import authConfig from '../../config/auth';
import Mail from '../../lib/Mail';

class ResetPassword {
  async update(req, res) {
    const schema = Yup.object().shape({
      pass: Yup.string().required(),
      confirmPass: Yup.string().when('pass', (pass, field) =>
        pass ? field.required().oneOf([Yup.ref('pass')]) : field
      ),
      token: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Campos com informações incorretas.' });
    }

    try {
      const { token, pass } = req.body;
      const decoded = await promisify(jwt.verify)(token, authConfig.secret);
      const user = await Users.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({ error: 'Acesso negado.' });
      }

      await user.update({pass: pass});
      return res.status(202).send({ message: 'Senha alterada com sucesso' });
    } catch (err) {
      return res.status(401).json({ error: 'Acesso negado.' });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Campos com informações incorretas.' });
    }
    const { email } = req.body;

    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .json({ error: 'Campo com informações incorretas.' });
    }

    const { id, name } = user;
    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Alteração de senha',
      template: 'resetpassword',
      context: {
        token,
        name,
      },
    });

    return res.json({ email });
  }
}

export default new ResetPassword();
