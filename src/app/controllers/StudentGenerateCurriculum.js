import pdf from 'html-pdf';
import handlebars from 'handlebars';
import { resolve } from 'path';
import fs from 'fs';
import { format, parseISO } from 'date-fns';

import StudentPersonalData from '../models/StudentPersonalData';
import StudentAddress from '../models/StudentAddress';
import StudentAcademicEducation from '../models/StudentAcademicEducation';
import StudentAdditionalTraining from '../models/StudentAdditionalTraining';
import StudentProfessionalExperiences from '../models/StudentProfessionalExperiences';
import User from '../models/Users';

class StudentGenerateCurriculum {
  async show(req, res) {
    const { category } = await User.findByPk(req.userId);
    if (category !== 'aluno') {
      return res.status(403).json({ error: 'Acesso não autorizado.' });
    }

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
    } = await StudentPersonalData.findOne({
      where: { user_id: req.userId },
    });

    const office = '';

    const {
      street,
      number,
      neighborHood,
      city,
    } = await StudentAddress.findOne({
      where: { user_id: req.userId },
    });

    const birthFormated = format(parseISO(birth), 'dd/MM/yyyy');

    const studentAcademicEducation = await StudentAcademicEducation.findAll({
      where: { user_id: req.userId },
    });

    const {
      inglesLevel,
      espanholLevel,
      others,
      othersLevel,
      excelLevel,
      wordLevel,
      powerPointLevel,
      computer,
      computerLevel,
    } = await StudentAdditionalTraining.findOne({
      where: { user_id: req.userId },
    });

    const studentProfessionalExperiences = await StudentProfessionalExperiences.findAll(
      {
        where: { user_id: req.userId },
      }
    );

    studentProfessionalExperiences.forEach(item => {
      item.dataValues.admissionDate = format(
        parseISO(item.dataValues.admissionDate),
        'dd/MM/yyyy'
      );
      !!item.dataValues.resignationDate
        ? (item.dataValues.resignationDate = format(
            parseISO(item.dataValues.resignationDate),
            'dd/MM/yyyy'
          ))
        : null;
    });

    const createPDF = (conteudo, options) =>
      new Promise((resolved, reject) => {
        pdf.create(conteudo, options).toBuffer((err, buffer) => {
          if (err !== null) {
            reject(err);
          } else {
            resolved(buffer);
            res.set('Content-Type', 'application/pdf');
            res.send(buffer);
          }
        });
      });

    const viewPath = resolve(
      __dirname,
      '..',
      '..',
      'app',
      'views',
      'curriculum'
    );

    const source = fs
      .readFileSync(resolve(viewPath, 'curriculum.hbs'))
      .toString('utf8');
    const template = handlebars.compile(source, { strict: true });

    const result = template({
      name,
      email,
      fone,
      currentCourse,
      cpf,
      sex,
      birthFormated,
      maritalStatus,
      children,
      cnh,
      street,
      number,
      neighborHood,
      city,
      studentAcademicEducation,
      inglesLevel,
      espanholLevel,
      others,
      othersLevel,
      excelLevel,
      wordLevel,
      powerPointLevel,
      computer,
      computerLevel,
      studentProfessionalExperiences,
      office,
    });

    const options = {
      format: 'A4',
      filename: 'curriculo.pdf',
      type: 'pdf',
      quality: '75',
    };
    await createPDF(result, options);

    return res.json();
  }
}

export default new StudentGenerateCurriculum();
