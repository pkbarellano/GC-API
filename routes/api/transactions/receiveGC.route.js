const express = require('express');
const router = express.Router();
const receiveGCFromVendor = require('../../../controllers/transactions/receiveGCFromVendor.controller');
const sessionRequest = require('../../../requests/session');
const checkSessionRequest = sessionRequest.check;
const transactionIDRequest = require('../../../requests/transactionID.request');
const transactionIDArrayRequest = require('../../../requests/transactionIDArray.request');
const session = require('../../../controllers/session.controller');
const receiveGCRequest = require('../../../requests/transactions/receiveGC');
const getReceiveGCRequest = receiveGCRequest.getReceiveGCFromVendor;
const createReceiveGCFromVendorRequest = receiveGCRequest.createReceiveGCFromVendor;
const getUpdateReceiveGCFromVendor = receiveGCRequest.getUpdateReceiveGCFromVendor;
const updateReceiveGCFromVendor = receiveGCRequest.updateReceiveGCFromVendor;

module.exports = app => {

    router.post('/get', checkSessionRequest.validate(), session.generalCheck, getReceiveGCRequest.validate(), receiveGCFromVendor.get);

    router.post('/create', checkSessionRequest.validate(), session.generalCheck, createReceiveGCFromVendorRequest.validate(), receiveGCFromVendor.create);

    router.post('/getUpdate', checkSessionRequest.validate(), session.generalCheck, transactionIDRequest.validate(), getUpdateReceiveGCFromVendor.validate(), receiveGCFromVendor.getUpdate);

    router.post('/update', checkSessionRequest.validate(), session.generalCheck, transactionIDRequest.validate(), updateReceiveGCFromVendor.validate(), receiveGCFromVendor.update);

    router.post('/postReceive', checkSessionRequest.validate(), session.generalCheck, transactionIDArrayRequest.validate(),
    receiveGCFromVendor.postReceive);

    router.post('/delete', checkSessionRequest.validate(), session.generalCheck, transactionIDArrayRequest.validate(), receiveGCFromVendor.deleteReceive);

    app.use('/api/transactions/receiveGCFromVendor', router);
};