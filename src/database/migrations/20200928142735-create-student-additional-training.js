module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('student_additional_trainings', {
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
      ingles_level: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      espanhol_level: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      others_level: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      computer_level: {
        type: Sequelize.STRING(255),
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
    return queryInterface.dropTable('student_additional_trainings');
  },
};
