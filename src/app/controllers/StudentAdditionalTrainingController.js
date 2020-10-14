import * as Yup from 'yup';
import StudentAdditionalTraining from '../models/StudentAdditionalTraining';
import User from '../models/Users';

class StudentAdditionalTrainingController {
  async store(req, res) {
    const schema = Yup.object().shape({
      inglesLevel: Yup.string().required(),
      espanholLevel: Yup.string().required(),
      othersLevel: Yup.string().required(),
      computerLevel: Yup.string().required(),
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

    const { inglesLevel, espanholLevel, othersLevel, computerLevel } = req.body;
    const response = await StudentAdditionalTraining.create({
      inglesLevel,
      espanholLevel,
      othersLevel,
      computerLevel,
      user_id: req.userId,
    });
    return res.json(response);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      inglesLevel: Yup.string().required(),
      espanholLevel: Yup.string().required(),
      othersLevel: Yup.string().required(),
      computerLevel: Yup.string().required(),
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

    const studentAdditionalTraining = await StudentAdditionalTraining.findOne({
      where: { user_id: req.userId },
    });

    await studentAdditionalTraining.update(req.body);

    const data = await StudentAdditionalTraining.findOne({
      where: { user_id: req.userId },
    });

    return res.json(data);
  }

  async show(req, res) {
    const { category } = await User.findByPk(req.userId);
    if (category !== 'aluno') {
      return res.status(403).json({ error: 'Acesso não autorizado.' });
    }
    const data = await StudentAdditionalTraining.findOne({
      where: { user_id: req.userId },
    });
    return res.json(data);
  }
}

export default new StudentAdditionalTrainingController();
