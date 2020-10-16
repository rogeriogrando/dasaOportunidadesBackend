'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.removeColumn( 'student_addresses', 'uf' );
   },
  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.addColumn( 'student_addresses', 'uf', {
      type: Sequelize.STRING(2),
      allowNull: false
    });
  }
}
