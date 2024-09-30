'use strict';
const db = require('../models');
const Group = db.group;
const Navigation = db.navigation;

const _getGroup = () => {

  return Group.findOne({
    attributes: ['iD']
  });
};

const _getAllNavigations = () => {

  return Navigation.findAll({
    attributes: ['iD']
  });
};

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

    await queryInterface.bulkDelete('groupNavigations', null, {});

    const group = await _getGroup();
    const navigations = await _getAllNavigations();

    if (group !== null && navigations.length !== 0) {

      let groupNavs = [];

      navigations.map((nav, index) => {
        groupNavs.push({
          groupID: group.iD,
          navigationID: nav.iD
        });
      });

      await queryInterface.bulkInsert('groupNavigations', groupNavs);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('groupNavigations', null, {});
  }
};
