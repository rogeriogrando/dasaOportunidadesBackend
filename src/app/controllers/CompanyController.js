import * as Yup from 'yup';
import Users from '../models/Users';
import Mail from '../../lib/Mail';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import AdminEmails from '../models/AdminEmails';

class CompanyController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      pass: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Campos com informações incorretas.' });
    }
    console.log(req.body);
    const userExist = await Users.findOne({
      where: { email: req.body.email, active: true },
    });

    if (userExist) {
      return res.status(400).json({ error: 'Empresa já cadastrada.' });
    }
    req.body.category = 'company';
    const userExistNoActive = await Users.findOne({
      where: { email: req.body.email, active: false },
    });
    if (!userExistNoActive) {
      await Users.create(req.body);
    }
    const { id, name, email, category } = await Users.findOne({
      where: { email: req.body.email },
    });

    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const emailist = await AdminEmails.findAll();
    console.log(emailist);

    emailist.map(async item => {
      await Mail.sendMail({
        to: `${item.email}`,
        subject: 'Ativação da conta empresarial',
        template: 'activateaccountpendcompany',
        context: {
          token,
          name,
        },
      });
    });

    if (userExistNoActive) {
      return res.status(400).json({
        error: 'Usuário já cadastrado, foi encaminhado e-mail para ativação.',
      });
    }

    return res.json({
      name,
      email,
      category,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      oldPass: Yup.string(),
      pass: Yup.string().when('oldPass', (oldPass, field) =>
        oldPass ? field.required('Campo obrigatorio') : field
      ),
      confirmPass: Yup.string().when('pass', (pass, field) =>
        pass ? field.required().oneOf([Yup.ref('pass')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Campos com informações incorretas.' });
    }

    const { email, oldPass } = req.body;

    const user = await Users.findByPk(req.userId);

    if (oldPass && !(await user.checkPassword(oldPass))) {
      return res.status(400).json({ error: 'A senha antiga não confere.' });
    }

    const { name, category } = await user.update(req.body);
    return res.json({
      name,
      category,
    });
  }
  async show(req, res) {
    const { name, email, category } = await Users.findByPk(req.userId);
    return res.json({
      name,
      email,
      category,
    });
  }
}

export default new CompanyController();
