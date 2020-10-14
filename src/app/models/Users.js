import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING(255),
        email: Sequelize.STRING(255),
        active: Sequelize.BOOLEAN,
        pass: Sequelize.VIRTUAL,
        pass_hash: Sequelize.STRING(255),
        category: Sequelize.STRING(20),
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async user => {
      if (user.pass) {
        user.pass_hash = await bcrypt.hash(user.pass, 8);
      }
    });
    return this;
  }

  checkPassword(pass) {
    return bcrypt.compare(pass, this.pass_hash);
  }
}

export default Users;
