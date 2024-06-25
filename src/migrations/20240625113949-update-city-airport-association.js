'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Airports',{
      type:'FOREIGN KEY',
      name:'city_fkey_constraint',
      fields:['cityId'],
      references:{
        table:'Cities',
        field:'id'
      },
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await   queryInterface.removeConstraint('Airports','city_fkey_constaint');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
