const express = require('express');
const router = express.Router();
const loginRequest = require('../../requests/login.request');
const auth = require('../../controllers/auth.controller');

module.exports = app => {

    router.post('/auth', loginRequest.validate(), auth.authenticate);

    app.use('/api/login', router);
};