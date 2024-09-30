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

    await queryInterface.bulkDelete('navigations', null, {});

    await queryInterface.bulkInsert('navigations', [
      {
        iD: 1,
        level: 'MAIN',
        navigationName: 'Transactions',
        directory: null,
        url: null,
        icon: 'cibPagekit',
        hasSub: 1,
        order: 1,
        firstLevelID: 0
      },
      {
        iD: 2,
        level: 'MAIN',
        navigationName: 'Receive GC From Vendor',
        directory: '/transaction',
        url: '/receivegcfromvendor',
        icon: 'cilMediaRecord',
        hasSub: 0,
        order: 1,
        firstLevelID: 1
      },
      {
        iD: 3,
        level: 'MAIN',
        navigationName: 'Allocate GC',
        directory: '/transaction',
        url: '/allocategc',
        icon: 'cilMediaRecord',
        hasSub: 0,
        order: 2,
        firstLevelID: 1
      },
      {
        iD: 4,
        level: 'MAIN',
        navigationName: 'Recieve From HO',
        directory: '/transaction',
        url: '/receivefromho',
        icon: 'cilMediaRecord',
        hasSub: 0,
        order: 3,
        firstLevelID: 1
      },
      {
        iD: 5,
        level: 'MAIN',
        navigationName: 'Sale GC',
        directory: '/transaction',
        url: '/salegc',
        icon: 'cilMediaRecord',
        hasSub: 0,
        order: 4,
        firstLevelID: 1
      },
      {
        iD: 6,
        level: 'MAIN',
        navigationName: 'Redeem GC',
        directory: '/transaction',
        url: '/redeemgc',
        icon: 'cilMediaRecord',
        hasSub: 0,
        order: 5,
        firstLevelID: 1
      },
      {
        iD: 7,
        level: 'MAIN',
        navigationName: 'Reports',
        directory: null,
        url: null,
        icon: 'cilNotes',
        hasSub: 1,
        order: 2,
        firstLevelID: 0
      },
      {
        iD: 8,
        level: 'MAIN',
        navigationName: 'Received GC From Vendor',
        directory: '/report',
        url: '/receivedgcfromvendor',
        icon: 'cilMediaRecord',
        hasSub: 0,
        order: 1,
        firstLevelID: 7
      },
      {
        iD: 9,
        level: 'MAIN',
        navigationName: 'Allocated GC',
        directory: '/report',
        url: '/allocatedgc',
        icon: 'cilMediaRecord',
        hasSub: 0,
        order: 2,
        firstLevelID: 7
      },
      {
        iD: 10,
        level: 'MAIN',
        navigationName: 'Received GC From HO',
        directory: '/report',
        url: '/receivedgcfromho',
        icon: 'cilMediaRecord',
        hasSub: 0,
        order: 3,
        firstLevelID: 7
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('navigations', null, {});
  }
};
