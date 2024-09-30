const uuid = require('uuid');

const generateAPIKey = () => {

    return uuid.v1();
};

module.exports = {
    generateAPIKey: generateAPIKey
};