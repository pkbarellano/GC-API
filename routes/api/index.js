module.exports = app => {

    require('./auth.route')(app);

    require('./session.route')(app);

    require('./navigation.route')(app);

    require('./transactions/controlNumber.route')(app);

    require('./transactions/receiveGC.route')(app);

    require('./reports/receiveGC.route')(app);

    require('./gCAmount.route')(app);
};