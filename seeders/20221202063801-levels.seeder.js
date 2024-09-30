'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkDelete('levels', null, {});

    await queryInterface.bulkInsert('levels', [
      {
        levelNumber: 1,
        levelName: 'Super User'
      },
      {
        levelNumber: 2,
        levelName: 'Supervisor'
      },
      {
        levelNumber: 3,
        levelName: 'Staff'
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('levels', null, {});
  }
};
