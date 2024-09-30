const express = require('express');
const router = express.Router();
const sessionRequest = require('../../requests/session');
const checkRequest = sessionRequest.check;
const session = require('../../controllers/session.controller');

module.exports = app => {

    router.post('/check', checkRequest.validate(), session.check);

    router.post('/destroy', checkRequest.validate(), session.destroy);

    app.use('/api/session', router);
};