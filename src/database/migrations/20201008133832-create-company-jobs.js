module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('company_jobs', {
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
      office: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      main_atributions: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      workload: {
        type: Sequelize.NUMERIC,
        allowNull: false,
      },
      work_schedule: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      benefits: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      remuneration: {
        type: Sequelize.NUMERIC,
      },
      requirements: {
        type: Sequelize.TEXT,
      },
      desirable: {
        type: Sequelize.TEXT,
      },
      minimum_age: {
        type: Sequelize.NUMERIC,
      },
      maximum_age: {
        type: Sequelize.NUMERIC,
      },
      application_deadline: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('company_jobs');
  },
};
