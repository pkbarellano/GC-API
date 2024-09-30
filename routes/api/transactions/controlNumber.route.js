const express = require('express');
const router = express.Router();
const controlNumber = require('../../../controllers/transactions/controlNumber.controller');

module.exports = app => {

    router.get('/generateReceive', controlNumber.generateReceive);

    app.use('/api/transactions/controlNumber', router);
};