const { Sequelize, DataTypes } = require('sequelize');

const config = require('../config/config.json');
const dbConfig = config.development;

const db = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    pool: dbConfig.pool
});

(async () => {
    try {
        await db.authenticate();
        console.log('Connected...');
    }
    catch (error) {
        console.log('Unable to connect to database: ', error);
    }
})();

const level = require('./level.model')(db, DataTypes);
const department = require('./department.model')(db, DataTypes);
const group = require('./group.model')(db, DataTypes);
const user = require('./user.model')(db, DataTypes);
const userConfiguration = require('./userConfiguration.model')(db, DataTypes);
const session = require('./session.model')(db, DataTypes);
const navigation = require('./navigation.model')(db, DataTypes);
const groupNavigation = require('./groupNavigation.model')(db, DataTypes);
const controlNumber = require('./controlNumber.model')(db, DataTypes);
const receiveGCHeaders = require('./receiveGCHeader.model')(db, DataTypes);
const receiveGCDetails = require('./receiveGCDetail.model')(db, DataTypes);
const gCAmounts = require('./gCAmount.model')(db, DataTypes);
const giftCertificates = require('./giftCertificate.model')(db, DataTypes);

(async () => {
    try {
        await db.sync({ force: false });
    } catch (error) {
        console.log(error);
    }
})();

module.exports = {
    sequelizeDB: db,
    user: user,
    level: level,
    department: department,
    group: group,
    userConfiguration: userConfiguration,
    session: session,
    navigation: navigation,
    groupNavigation: groupNavigation,
    controlNumber: controlNumber,
    receiveGCHeader: receiveGCHeaders,
    receiveGCDetail: receiveGCDetails,
    gCAmount: gCAmounts,
    giftCertificate: giftCertificates
};