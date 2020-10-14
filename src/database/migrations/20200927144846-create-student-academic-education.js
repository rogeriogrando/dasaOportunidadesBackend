module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('student_academic_educations', {
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
      institution: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      description: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      initial_year: {
        type: Sequelize.STRING(4),
        allowNull: false,
      },
      final_year: {
        type: Sequelize.STRING(4),
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
    return queryInterface.dropTable('student_academic_educations');
  },
};
