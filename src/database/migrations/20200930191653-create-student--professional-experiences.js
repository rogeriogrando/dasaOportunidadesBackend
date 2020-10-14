module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('student_professional_experiences', {
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
      company: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      office: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      admission_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      resignation_date: {
        type: Sequelize.DATEONLY,
      },
      reason_dismissal: {
        type: Sequelize.TEXT,
      },
      salary: {
        type: Sequelize.NUMERIC,
      },
      developed_activities: {
        type: Sequelize.TEXT,
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
    return queryInterface.dropTable('student_professional_experiences');
  },
};
