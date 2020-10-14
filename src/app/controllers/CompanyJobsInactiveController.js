import * as Yup from 'yup';
import CompanyJobs from '../models/CompanyJobs';
import User from '../models/Users';
import { Op } from 'sequelize';
import { format } from 'date-fns'

class CompanyJobsInactiveController {
  async update(req, res) {
    const schema = Yup.object().shape({
      office: Yup.string().required('Cargo obrigatória'),
      mainAtributions: Yup.string().required(
        'Principais atribuições obrigatório'
      ),
      workload: Yup.string().required('Carga horária obrigatória'),
      workSchedule: Yup.string().required('Periodo obrigatório'),
      benefits: Yup.string().required('Benefícios obrigatório'),
      applicationDeadline: Yup.string().required(
        'Validade da vaga obrigatória'
      ),
    });

    const { category } = await User.findByPk(req.userId);
    if (category !== 'company') {
      return res.status(403).json({ error: 'Acesso não autorizado.' });
    }

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Campos com informações incorretas.' });
    }

    const companyJobs = await CompanyJobs.findOne({
      where: { user_id: req.userId, id: req.params.id },
    });

    await companyJobs.update(req.body);

    const data = await CompanyJobs.findOne({
      where: { user_id: req.userId, id: req.params.id },
    });

    return res.json(data);
  }

  async delete(req, res) {
    const { category } = await User.findByPk(req.userId);
    if (category !== 'company') {
      return res.status(403).json({ error: 'Acesso não autorizado.' });
    }
    const companyJobs = await CompanyJobs.findOne(
      {
        where: { user_id: req.userId, id: req.params.id },
      }
    );
    await companyJobs.destroy();
    return res.json(companyJobs);
  }

  async show(req, res) {
    const { category } = await User.findByPk(req.userId);
    if (category !== 'company') {
      return res.status(403).json({ error: 'Acesso não autorizado.' });
    }
    const data = await CompanyJobs.findOne({
      where: { user_id: req.userId, id: req.params.id, active: false },
    });
    return res.json(data);
  }

  async index(req, res) {
    const { category } = await User.findByPk(req.userId);
    if (category !== 'company') {
      return res.status(403).json({ error: 'Acesso não autorizado.' });
    }

    const dateNow = format(new Date(), 'dd/MM/yyyy');

    const data = await CompanyJobs.findAll({
      where: { user_id: req.userId,
        [Op.or]: {
          active: false,
          applicationDeadline: {
            [Op.lt]: dateNow
          }
        }
      },
    });
    return res.json(data);
  }
}

export default new CompanyJobsInactiveController();
