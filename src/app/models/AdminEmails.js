import Sequelize, { Model } from 'sequelize';

class AdminEmails extends Model {
  static init(sequelize) {
    super.init(
      {
        email: Sequelize.STRING(255),
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default AdminEmails;
