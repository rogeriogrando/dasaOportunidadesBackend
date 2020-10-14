import Sequelize, { Model } from 'sequelize';

class StudentProfessionalExperiences extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        company: Sequelize.STRING(255),
        office: Sequelize.STRING(255),
        admissionDate: Sequelize.DATE,
        resignationDate: Sequelize.DATE,
        reasonDismissal: Sequelize.TEXT,
        salary: Sequelize.NUMBER,
        developedActivities: Sequelize.TEXT,
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
      as: 'user',
    });
  }
}

export default StudentProfessionalExperiences;
