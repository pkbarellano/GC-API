const express = require('express');
const router = express.Router();
const gCAmount = require('../../controllers/gCAmount.controller');

module.exports = app => {

    router.get('/get', gCAmount.getGCAmounts);

    app.use('/api/gCAmount', router);
};