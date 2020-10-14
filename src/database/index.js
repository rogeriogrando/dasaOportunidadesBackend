import Sequelize from 'sequelize';
import Users from '../app/models/Users';
import StudentPersonalData from '../app/models/StudentPersonalData';
import StudentAddress from '../app/models/StudentAddress';
import StudentAcademicEducation from '../app/models/StudentAcademicEducation';
import StudentAdditionalTraining from '../app/models/StudentAdditionalTraining';
import StudentProfessionalExperiences from '../app/models/StudentProfessionalExperiences';
import AdminEmails from '../app/models/AdminEmails';
import CompanyJobs from '../app/models/CompanyJobs';
import StudentJobs from '../app/models/StudentJobs';
import databaseConfig from '../config/database';

const models = [
  Users,
  StudentPersonalData,
  StudentAddress,
  StudentAcademicEducation,
  StudentAdditionalTraining,
  StudentProfessionalExperiences,
  AdminEmails,
  CompanyJobs,
  StudentJobs,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
