import * as Yup from 'yup';
import StudentPersonalData from '../models/StudentPersonalData';

class AdminEmailController {
  async index(req, res) {
    const data = await StudentPersonalData.findAll();
    return res.json(data);
  }
}

export default new AdminEmailController();
