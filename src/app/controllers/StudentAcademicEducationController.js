import * as Yup from 'yup';
import StudentAcademicEducation from '../models/StudentAcademicEducation';
import User from '../models/Users';

class StudentAcademicEducationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      institution: Yup.string().required(),
      description: Yup.string().required(),
      initialYear: Yup.string().required(),
      finalYear: Yup.string().required(),
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

    const { institution, description, initialYear, finalYear } = req.body;
    const response = await StudentAcademicEducation.create({
      institution,
      description,
      initialYear,
      finalYear,
      user_id: req.userId,
    });
    return res.json(response);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      institution: Yup.string().required(),
      description: Yup.string().required(),
      initialYear: Yup.string().required(),
      finalYear: Yup.string().required(),
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

    const studentAcademicEducation = await StudentAcademicEducation.findOne({
      where: { user_id: req.userId, id: req.params.id },
    });

    await studentAcademicEducation.update(req.body);

    const data = await StudentAcademicEducation.findOne({
      where: { user_id: req.userId, id: req.params.id },
    });

    return res.json(data);
  }

  async show(req, res) {
    const { category } = await User.findByPk(req.userId);
    if (category !== 'aluno') {
      return res.status(403).json({ error: 'Acesso não autorizado.' });
    }
    const data = await StudentAcademicEducation.findOne({
      where: { user_id: req.userId, id: req.params.id },
    });
    return res.json(data);
  }

  async index(req, res) {
    const { category } = await User.findByPk(req.userId);
    if (category !== 'aluno') {
      return res.status(403).json({ error: 'Acesso não autorizado.' });
    }
    const data = await StudentAcademicEducation.findAll({
      where: { user_id: req.userId },
    });
    return res.json(data);
  }

  async delete(req, res) {
    const { category } = await User.findByPk(req.userId);
    if (category !== 'aluno') {
      return res.status(403).json({ error: 'Acesso não autorizado.' });
    }
    const studentAcademicEducation = await StudentAcademicEducation.findOne({
      where: { user_id: req.userId, id: req.params.id },
    });

    await studentAcademicEducation.destroy();
    return res.json(studentAcademicEducation);
  }
}

export default new StudentAcademicEducationController();
