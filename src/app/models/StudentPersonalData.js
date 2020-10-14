import Sequelize, { Model } from 'sequelize';

class StudentPersonalData extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        name: Sequelize.STRING(255),
        email: Sequelize.STRING(255),
        fone: Sequelize.STRING(11),
        currentCourse: Sequelize.STRING(255),
        cpf: Sequelize.STRING(11),
        cnh: Sequelize.STRING(20),
        sex: Sequelize.STRING(20),
        birth: Sequelize.DATE,
        maritalStatus: Sequelize.STRING(20),
        children: Sequelize.INTEGER,
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

export default StudentPersonalData;
