import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import Users from '../models/Users';
import authConfig from '../../config/auth';
import Mail from '../../lib/Mail';

class ActivateAccount {
  async update(req, res) {
    try {
      const { token } = req.params;

      const decoded = await promisify(jwt.verify)(token, authConfig.secret);
      const user = await Users.findByPk(decoded.id);

      if (!user) {
        return res.status(401).json({ error: 'Acesso negado.' });
      }

      await user.update({ active: true }, { where: { id: user.id } });

      await Mail.sendMail({
        to: `${user.name} <${user.email}>`,
        subject: 'Ativação da conta',
        template: 'activateaccount',
        context: {
          token,
          name: user.name,
        },
      });
      return res.status(202).send({ message: 'Aluno ativado com sucesso' });
    } catch (err) {
      // return err;
      return res.status(401).json({ error: 'Acesso negado.' });
    }
  }
}

export default new ActivateAccount();
