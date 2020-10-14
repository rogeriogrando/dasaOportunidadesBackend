import Sequelize, { Model } from 'sequelize';

class StudentJobs extends Model {
  static init(sequelize) {
    super.init(
      {
        userId: Sequelize.INTEGER,
        companyJobsId: Sequelize.INTEGER,
        company: Sequelize.STRING(255),
        office: Sequelize.STRING(255),
        mainAtributions: Sequelize.TEXT,
        workload: Sequelize.NUMBER,
        workSchedule: Sequelize.STRING,
        benefits: Sequelize.TEXT,
        remuneration: Sequelize.NUMBER,
        requirements: Sequelize.TEXT,
        desirable: Sequelize.TEXT,
        minimumAge: Sequelize.NUMBER,
        maximumAge: Sequelize.NUMBER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'student',
    });
    this.belongsTo(models.StudentJobs, {
      foreignKey: 'company_jobs_id',
      as: 'student_jobs',
    });

  }

}

export default StudentJobs;
