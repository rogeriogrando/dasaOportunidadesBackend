module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('student_personal_data', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      current_course: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },

      fone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      cnh: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      sex: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      birth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      marital_status: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      children: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('student_personal_data');
  },
};
