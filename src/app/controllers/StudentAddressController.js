import * as Yup from 'yup';
import StudentAddress from '../models/StudentAddress';
import User from '../models/Users';

class StudentAddressController {
  async store(req, res) {

    const schema = Yup.object().shape({
      street: Yup.string().required(),
      number: Yup.string().required(),
      neighborHood: Yup.string().required(),
      city: Yup.string().required(),
    });

    const { category } = await User.findByPk(req.userId);
    if (category !== 'aluno') {
      return res.status(403).json({ error: 'Acesso não autorizado.' });
    }

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Campos com informações incorretas.' });
    }

    const cadExist = await StudentAddress.findOne({
      where: { user_id: req.userId },
    });

    if (cadExist) {
      return res.status(400).json({ error: 'Dados pessoais já cadastrado.' });
    }

    const { street, number, neighborHood, city } = req.body;
    await StudentAddress.create({
      street,
      number,
      neighborHood,
      city,
      user_id: req.userId,
    });
    return res.json(req.body);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      street: Yup.string().required(),
      number: Yup.string().required(),
      neighborHood: Yup.string().required(),
      city: Yup.string().required(),
    });

    const { category } = await User.findByPk(req.userId);
    if (category !== 'aluno') {
      return res.status(403).json({ error: 'Acesso não autorizado.' });
    }

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Campos com informações incorretas.' });
    }

    const studentAddress = await StudentAddress.findOne({
      where: { user_id: req.userId },
    });

    const { data } = await studentAddress.update(req.body);
    return res.json(data);
  }
  async show(req, res) {
    const { category } = await User.findByPk(req.userId);
    if (category !== 'aluno') {
      return res.status(403).json({ error: 'Acesso não autorizado.' });
    }
    const data = await StudentAddress.findOne({
      where: { user_id: req.userId },
    });
    return res.json(data);
  }
}

export default new StudentAddressController();
