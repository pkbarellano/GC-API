const db = require('../models');
const Group = db.group;
const { Op } = require('sequelize');

const validation = require('../helpers/validation.helper');

const _navigationsFirstLevel = (groupID, level, res) => {

    return Group.findAll({
        include: [
            {
                association: 'Navigation',
                attributes: ['iD', 'level', 'navigationName', 'directory', 'url', 'icon', 'hasSub', 'order', 'firstLevelID'],
                required: true,
                where: {
                    level: level,
                    [Op.or]: [
                        { hasSub: 1 },
                        {
                            [Op.and]: [
                                { hasSub: 0 },
                                { firstLevelID: 0 }
                            ]
                        }
                    ]
                },
                order: [['order', 'ASC']]
            }
        ],
        where: {
            iD: groupID
        }
    })
        .then(data => {

            return data;
        })
        .catch(error => {

            console.log(error);

            return res.status(422).send({
                message: 'Encountered an application error while attempting to retrieve navigations. Please retry or contact your administrator for assistance.'
            });
        });
};

const _navigationsSecondLevel = (groupID, level, res) => {

    return Group.findAll({
        include: [
            {
                association: 'Navigation',
                attributes: ['iD', 'level', 'navigationName', 'directory', 'url', 'icon', 'hasSub', 'order', 'firstLevelID'],
                required: true,
                where: {
                    [Op.and]: [
                        { level: level },
                        { hasSub: 0 },
                        {
                            [Op.not]: [
                                { firstLevelID: 0 }
                            ]
                        }
                    ]
                },
                order: [['order', 'ASC'], ['firstLevel', 'ASC']]
            }
        ],
        where: {
            iD: groupID
        }
    })
        .then(data => {

            return data;
        })
        .catch(error => {

            console.log(error);

            return res.status(422).send({
                message: 'Encountered an application error while attempting to retrieve navigations. Please retry or contact your administrator for assistance.'
            });
        });
};

const _getGroupNavigations = async (groupID, level, res, next) => {

    const navsFirstLevel = await _navigationsFirstLevel(groupID, level, res);
    const navsSecondLevel = await _navigationsSecondLevel(groupID, level, res);

    if (navsFirstLevel.length === 0 || navsSecondLevel.length === 0) {

        const response = {
            message: 'Restricted.',
            status: false
        };

        res.status(200).send(response);
    }

    const response = navsFirstLevel[0].Navigation.map((firstLevel, index) => {

        let subNav = navsSecondLevel[0].Navigation.filter(prop => {
            return (firstLevel.hasSub === 1 && firstLevel.iD === prop.firstLevelID);
        }).map((secondLevel, index) => {
            return {
                iD: secondLevel.iD,
                level: secondLevel.level,
                navigationName: secondLevel.navigationName,
                directory: secondLevel.directory,
                url: secondLevel.url,
                icon: secondLevel.icon
            };
        });

        return {
            iD: firstLevel.iD,
            level: firstLevel.level,
            navigationName: firstLevel.navigationName,
            directory: firstLevel.directory,
            url: firstLevel.url,
            icon: firstLevel.icon,
            hasSub: firstLevel.hasSub,
            subNav: subNav
        };
    });

    res.status(200).send({
        status: true,
        navigations: response
    });
};

const groupNavs = (req, res, next) => {

    const body = req.body;

    validation.validateResult(req, res, next);

    _getGroupNavigations(body.groupID, body.level, res, next)
};

module.exports = {
    groupNavs: groupNavs
};