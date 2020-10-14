module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('student_jobs', {
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
      company_jobs_id: {
        type: Sequelize.INTEGER,
        references: { model: 'company_jobs', key: 'id' },
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
    return queryInterface.dropTable('student_jobs');
  },
};

