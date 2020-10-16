import Sequelize, { Model } from 'sequelize';

class StudentAdditionalTraining extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        inglesLevel: Sequelize.STRING(255),
        espanholLevel: Sequelize.STRING(255),
        othersLevel: Sequelize.STRING(255),
        others: Sequelize.STRING(255),
        excelLevel: Sequelize.STRING(255),
        wordLevel: Sequelize.STRING(255),
        powerPointLevel: Sequelize.STRING(255),
        computer: Sequelize.STRING(255),
        computerLevel: Sequelize.STRING(255),
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

export default StudentAdditionalTraining;
