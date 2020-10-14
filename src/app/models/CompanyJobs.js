import Sequelize, { Model } from 'sequelize';

class CompanyJobs extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
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
        applicationDeadline: Date,
        active: Sequelize.BOOLEAN,
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
      as: 'company',
    });
  }
}

export default CompanyJobs;
