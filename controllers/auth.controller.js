const db = require('../models');
const User = db.user;
const Session = db.session;
const bcrypt = require('../helpers/bcrypt.helper');
const { generateAPIKey } = require('../helpers/apiKey.helper');
const validation = require('../helpers/validation.helper');

const _getUser = (username, res) => {

    return User.findOne({
        attributes: ['iD', 'username', 'password', 'firstName', 'middleName', 'lastName'],
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
            username: username
        }
    }).then(data => {

        return data;
    }).catch(error => {

        console.log(error);

        res.status(422).send({
            message: 'Encountered an application error while attempting to retrieve your credentials. Please retry or contact your administrator for assistance.'
        });
    });
};

const _createSession = async (userID, res) => {

    await Session.destroy({
        where: { userID: userID }
    });

    const apiKey = generateAPIKey();

    const sess = await Session.create({
        apiKey: apiKey,
        userID: userID
    });

    if (!sess) {

        res.status(422).send({
            message: 'Encountered an application error while attempting to create session. Please retry or contact your administrator for assistance.'
        });
    }

    return apiKey;
};

const _validateUser = async (body, res, next) => {

    const user = await _getUser(body.username, res);

    if (user === null) {

        res.status(200).send({
            status: false,
            message: 'Incorrect Username.'
        });
    }
    
    const comparePassword = bcrypt.comparePassword(body.password, user.password);

    if (!comparePassword) {

        res.status(200).send({
            status: false,
            message: 'Incorrect Password.'
        });
    }

    const apiKey = await _createSession(user.iD, res);

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

const authenticate = (req, res, next) => {

    validation.validateResult(req, res, next);

    _validateUser(req.body, res, next);
};

module.exports = {
    authenticate: authenticate
};