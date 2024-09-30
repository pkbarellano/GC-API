'use strict';
const db = require('../models');
const User = db.user;
const Level = db.level;
const Department = db.department;
const Group = db.group;

const getUser = () => {

  return User.findOne({
    attributes: ['iD'],
    order: [['iD', 'ASC']]
  });
};

const getLevel = () => {

  return Level.findOne({
    attributes: ['iD'],
    order: [['iD', 'ASC']]
  });
};

const getDepartment = () => {

  return Department.findOne({
    attributes: ['iD'],
    order: [['iD', 'ASC']]
  });
};

const getGroup = () => {

  return Group.findOne({
    attributes: ['iD'],
    order: [['iD', 'ASC']]
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

    await queryInterface.bulkDelete('userconfigurations', null, {});

    const user = await getUser();
    const level = await getLevel();
    const department = await getDepartment();
    const group = await getGroup();

    if (user !== null && level !== null && department !== null && group !== null) {

      await queryInterface.bulkInsert('userconfigurations', [{
        userID: user.iD,
        levelID: level.iD,
        departmentID: department.iD,
        groupID: group.iD
      }]);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('userconfigurations', null, {});
  }
};