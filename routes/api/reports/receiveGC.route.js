const express = require('express');
const router = express.Router();
const sessionRequest = require('../../../requests/session');
const checkSessionRequest = sessionRequest.check;
const session = require('../../../controllers/session.controller');
const receiveGCFromVendor = require('../../../controllers/reports/receiveGCFromVendor.controller');
const receiveGCRequest = require('../../../requests/reports/receiveGC/index');
const getReceiveGCFromVendor = receiveGCRequest.getReceiveGCFromVendor

module.exports = app => {

    router.post('/get', checkSessionRequest.validate(), session.generalCheck, getReceiveGCFromVendor.validate(), receiveGCFromVendor.get);

    app.use('/api/reports/receiveGCFromVendor', router);
};