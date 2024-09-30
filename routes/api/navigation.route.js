const express = require('express');
const router = express.Router();
const navigationRequest = require('../../requests/navigation.request');
const navigation = require('../../controllers/navigation.controller');

module.exports = app => {

    router.post('/groupNavs', navigationRequest.validate(), navigation.groupNavs)

    app.use('/api/navigation', router);
};