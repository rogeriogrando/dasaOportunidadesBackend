import Sequelize, { Model } from 'sequelize';

class StudentAddress extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        street: Sequelize.STRING(255),
        number: Sequelize.STRING(15),
        neighborHood: Sequelize.STRING(255),
        city: Sequelize.STRING(255),
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

export default StudentAddress;
