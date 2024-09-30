const db = require('../../models');
const SequelizeDB = db.sequelizeDB;
const ControlNumber = db.controlNumber;

const _createReceiveControlNumber = (res, t) => {

    ControlNumber.increment({ receiveControlNumber: 1 },
        {
            transaction: t,
            where: { id: 1 }
        })
        .then(async () => {

            const cNum = await ControlNumber.findOne({
                attributes: ['receiveControlNumber'],
                where: { 'iD': 1 }
            });

            res.status(200).send({
                status: true,
                data: {
                    controlNumber: cNum.receiveControlNumber
                }
            });
        })
        .catch(error => {

            console.log(error);

            return res.status(422).send({
                message: 'Encountered an application error while attempting to create control number. Please retry or contact your administrator for assistance.'
            });
        });
};

const generateReceive = async (req, res, next) => {

    await SequelizeDB.transaction(async t => {

        await _createReceiveControlNumber(res, t);
    });
};

module.exports = {
    generateReceive: generateReceive
};