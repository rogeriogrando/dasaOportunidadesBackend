import Sequelize, { Model } from 'sequelize';

class StudentAcademicEducation extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        institution: Sequelize.STRING(255),
        description: Sequelize.STRING(255),
        initialYear: Sequelize.STRING(4),
        finalYear: Sequelize.STRING(4),
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

export default StudentAcademicEducation;
