import * as Yup from 'yup';
import StudentProfessionalExperiences from '../models/StudentProfessionalExperiences';
import User from '../models/Users';

class StudentProfessionalExperiencesController {
  async store(req, res) {
    const schema = Yup.object().shape({
      company: Yup.string().required(),
      office: Yup.string().required(),
      admissionDate: Yup.date().required(),
      developedActivities: Yup.string().required(),
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

    const {
      company,
      office,
      admissionDate,
      resignationDate,
      reasonDismissal,
      salary,
      developedActivities,
    } = req.body;
    const response = await StudentProfessionalExperiences.create({
      company,
      office,
      admissionDate,
      resignationDate,
      reasonDismissal,
      salary,
      developedActivities,
      user_id: req.userId,
    });
    return res.json(response);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      company: Yup.string().required(),
      office: Yup.string().required(),
      admissionDate: Yup.date().required(),
      developedActivities: Yup.string().required(),
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

    const studentProfessionalExperiences = await StudentProfessionalExperiences.findOne(
      {
        where: { user_id: req.userId, id: req.params.id },
      }
    );

    await studentProfessionalExperiences.update(req.body);

    const data = await StudentProfessionalExperiences.findOne({
      where: { user_id: req.userId, id: req.params.id },
    });

    return res.json(data);
  }

  async show(req, res) {
    const { category } = await User.findByPk(req.userId);
    if (category !== 'aluno') {
      return res.status(403).json({ error: 'Acesso não autorizado.' });
    }
    const data = await StudentProfessionalExperiences.findOne({
      where: { user_id: req.userId, id: req.params.id },
    });
    return res.json(data);
  }

  async delete(req, res) {
    const { category } = await User.findByPk(req.userId);
    if (category !== 'aluno') {
      return res.status(403).json({ error: 'Acesso não autorizado.' });
    }
    const studentProfessionalExperiences = await StudentProfessionalExperiences.findOne(
      {
        where: { user_id: req.userId, id: req.params.id },
      }
    );
    await studentProfessionalExperiences.destroy();
    return res.json(studentProfessionalExperiences);
  }

  async index(req, res) {
    const { category } = await User.findByPk(req.userId);
    if (category !== 'aluno') {
      return res.status(403).json({ error: 'Acesso não autorizado.' });
    }
    const data = await StudentProfessionalExperiences.findAll({
      where: { user_id: req.userId },
    });
    return res.json(data);
  }
}

export default new StudentProfessionalExperiencesController();
