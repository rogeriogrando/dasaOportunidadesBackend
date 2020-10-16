import * as Yup from 'yup';
import StudentPersonalData from '../models/StudentPersonalData';
import User from '../models/Users';

class StudentPersonalDataController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      fone: Yup.string().required(),
      currentCourse: Yup.string().required(),
      cpf: Yup.string().required(),
      sex: Yup.string().required(),
      birth: Yup.date().required(),
      maritalStatus: Yup.string().required(),
      children: Yup.number().required(),
      cnh: Yup.string().required(),
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

    const cadExist = await StudentPersonalData.findOne({
      where: { user_id: req.userId },
    });

    const {
      name,
      email,
      fone,
      currentCourse,
      cpf,
      sex,
      birth,
      maritalStatus,
      children,
      cnh,
    } = req.body;
    console.log(req.body);
    console.log(req.userId);
    await StudentPersonalData.create({
      name,
      email,
      fone,
      currentCourse,
      cpf,
      sex,
      birth,
      maritalStatus,
      children,
      cnh,
      user_id: req.userId,
    });

    return res.json(req.body);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      fone: Yup.string().required(),
      currentCourse: Yup.string().required(),
      cpf: Yup.string().required(),
      sex: Yup.string().required(),
      birth: Yup.date().required(),
      maritalStatus: Yup.string().required(),
      children: Yup.number().required(),
      cnh: Yup.string().required(),
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

    const personalData = await StudentPersonalData.findOne({
      where: { user_id: req.userId },
    });

    const { data } = await personalData.update(req.body);
    return res.json(data);
  }
  async show(req, res) {
    const { category } = await User.findByPk(req.userId);
    if (category !== 'aluno') {
      return res.status(403).json({ error: 'Acesso não autorizado.' });
    }
    const data = await StudentPersonalData.findOne({
      where: { user_id: req.userId },
    });
    return res.json(data);
  }
}

export default new StudentPersonalDataController();
