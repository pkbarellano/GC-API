const validation = require('../helpers/validation.helper');
const db = require('../models');
const SequelizeDB = db.sequelizeDB;
const Session = db.session;
const User = db.user;

const _getToken = (apiKey, res) => {

    return Session.findOne({
        attributes: ['userID'],
        where: {
            apiKey: apiKey
        }
    })
        .then(data => {
            return data;
        })
        .catch(error => {

            console.log(error);

            return res.status(422).send({
                message: 'Encountered an application error while attempting to retrieve your session key. Please retry or contact your administrator for assistance.'
            });
        });
};

const _getUser = userID => {

    return User.findOne({
        attributes: ['username', 'firstName', 'middleName', 'lastName'],
        include: [
            {
                association: 'Level',
                attributes: ['iD', 'levelNumber', 'levelName'],
                required: true
            },
            {
                association: 'Department',
                attributes: ['iD', 'departmentName'],
                required: true
            },
            {
                association: 'Group',
                attributes: ['iD', 'groupName'],
                required: true
            }
        ],
        where: {
            iD: userID
        }
    }).then(data => {

        return data;
    }).catch(error => {

        console.log(error);

        return res.status(422).send({
            message: 'Encountered an application error while attempting to retrieve your credentials. Please retry or contact your administrator for assistance.'
        });
    });
};

const _setParameter = async (userID, apiKey, res) => {

    const user = await _getUser(userID);

    if (user === null) {

        res.status(200).send({
            status: false,
            message: 'Unable to retrieve your credentials.'
        });
    }

    const response = {
        status: true,
        message: "Logged in.",
        data: {
            apiKey: apiKey,
            username: user.username,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            levelCode: user.Level[0].iD,
            levelNumber: user.Level[0].levelNumber,
            levelName: user.Level[0].levelName,
            departmentCode: user.Department[0].iD,
            departmentName: user.Department[0].departmentName,
            groupCode: user.Group[0].iD,
            groupName: user.Group[0].groupName
        }
    };

    res.status(200).send(response);
};

const _validateSession = async (apiKey, res) => {

    const session = await _getToken(apiKey, res);

    if (session === null) {

        const response = {
            message: 'Session timeout',
            status: false
        };

        res.status(200).send(response);
    }

    _setParameter(session.userID, apiKey, res);
};

const check = (req, res, next) => {

    validation.validateResult(req, res, req.body);

    _validateSession(req.body.apiKey, res);
};

const _destroySession = async (apiKey, res) => {

    await SequelizeDB.transaction(async t => {

        await Session.destroy({
            where: { apiKey: apiKey }
        }, {
            transaction: t
        }).then(() => {

            res.status(200).send({
                status: true,
                message: 'Logged out successfully.'
            });
        }).catch(error => {

            console.log(error);

            res.status(422).send({
                message: 'Encountered an application error while attempting to destroy session. Please retry or contact your administrator for assistance.'
            });
        });
    });
};

const destroy = (req, res, next) => {

    validation.validateResult(req, res, req.body);

    _destroySession(req.body.apiKey, res);
};

const _generalValidateSession = async (apiKey, res, next) => {

    const session = await _getToken(apiKey, res);

    if (session === null) {

        const response = {
            message: 'Session timeout',
            status: false
        };

        res.status(200).send(response);
    } else {

        next();
    }
};

const generalCheck = async (req, res, next) => {

    await validation.validateResult(req, res, next);

    _generalValidateSession(req.body.apiKey, res, next);
};

module.exports = {
    check: check,
    destroy: destroy,
    generalCheck: generalCheck
};