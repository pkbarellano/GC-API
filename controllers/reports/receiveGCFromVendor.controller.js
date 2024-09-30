const { Sequelize } = require('sequelize');
const db = require('../../models');
const validation = require('../../helpers/validation.helper');
const SequelizeDB = db.sequelizeDB;

const _openReceive = (andWhere, res) => {

    return SequelizeDB.query("SELECT DATE_FORMAT ( createdAt, '%Y-%m' ) AS `monthyear`, count( createdAt ) AS `count` FROM `receiveGCHeaders` AS `ReceiveGCHeader` WHERE ( `ReceiveGCHeader`.`deletedAt` IS NULL AND `ReceiveGCHeader`.`status` = 'O' ) AND " + andWhere + " GROUP BY concat( MONTH ( createdAt ), '-', YEAR ( createdAt ) ) ORDER BY YEAR ( createdAt );", { type: Sequelize.QueryTypes.SELECT })
        .then(response => {

            let monthyear = [];
            let count = [];

            response.map(item => {
                monthyear.push(item.monthyear);
                count.push(item.count);
            });

            return {
                monthyear: monthyear,
                count: count
            };
        }).catch(error => {

            console.log(error);

            return res.status(422).send({
                message: 'Encountered an application error while attempting to retreive open receive gc header. Please retry or contact your administrator for assistance.'
            });
        });
};

const _postedReceive = (andWhere, res) => {

    return SequelizeDB.query("SELECT DATE_FORMAT ( createdAt, '%Y-%m' ) AS `monthyear`, count( createdAt ) AS `count` FROM `receiveGCHeaders` AS `ReceiveGCHeader` WHERE ( `ReceiveGCHeader`.`deletedAt` IS NULL AND `ReceiveGCHeader`.`status` = 'P' ) AND " + andWhere + " GROUP BY concat( MONTH ( createdAt ), '-', YEAR ( createdAt ) ) ORDER BY YEAR ( createdAt );", { type: Sequelize.QueryTypes.SELECT })
        .then(response => {

            let monthyear = [];
            let count = [];

            response.map(item => {
                monthyear.push(item.monthyear);
                count.push(item.count);
            });

            return {
                monthyear: monthyear,
                count: count
            };
        }).catch(error => {

            console.log(error);

            return res.status(422).send({
                message: 'Encountered an application error while attempting to retreive posted receive gc header. Please retry or contact your administrator for assistance.'
            });
        });
};

const _deletedReceive = (andWhere, res) => {

    return SequelizeDB.query("SELECT DATE_FORMAT ( createdAt, '%Y-%m' ) AS `monthyear`, count( createdAt ) AS `count` FROM `receiveGCHeaders` AS `ReceiveGCHeader` WHERE ( `ReceiveGCHeader`.`deletedAt` IS NOT NULL ) AND " + andWhere + " GROUP BY concat( MONTH ( createdAt ), '-', YEAR ( createdAt ) ) ORDER BY YEAR ( createdAt );", { type: Sequelize.QueryTypes.SELECT })
        .then(response => {

            let monthyear = [];
            let count = [];

            response.map(item => {
                monthyear.push(item.monthyear);
                count.push(item.count);
            });

            return {
                monthyear: monthyear,
                count: count
            };
        }).catch(error => {

            console.log(error);

            return res.status(422).send({
                message: 'Encountered an application error while attempting to retreive deleted receive gc header. Please retry or contact your administrator for assistance.'
            });
        });
};

const _getCSVData = (andWhere, res) => {

    return SequelizeDB.query("SELECT a.controlNumber, a.pONumber, a.dRNumber, a.vendorName, a.remarks, CASE WHEN deletedAt IS NOT NULL THEN 'DELETED' WHEN a.`status` = 'O' THEN 'OPEN' WHEN a.`status` = 'P' THEN 'POSTED' END AS `status`, b.gCNumberFrom, b.gCNumberTo, b.amount, DATE_FORMAT(a.createdAt, '%Y-%m-%d %H:%i') AS `createdAt`, DATE_FORMAT(a.deletedAt, '%Y-%m-%d %H:%i') AS `deletedAt` FROM receiveGCHeaders a LEFT JOIN receiveGCDetails b ON a.iD = b.receiveGCHeaderID WHERE " + andWhere + ";", { type: Sequelize.QueryTypes.SELECT })
        .then(response => {

            return response;
        }).catch(error => {

            console.log(error);

            return res.status(422).send({
                message: 'Encountered an application error while attempting to retreive deleted receive gc header. Please retry or contact your administrator for assistance.'
            });
        });
};

const _getHandler = async (body, res) => {

    let andWhere = " YEAR(createdAt) = YEAR(now()) ";

    if ((body.dateFrom.length > 0 && body.dateTo.length > 0) && (new Date(body.dateFrom) <= new Date(body.dateTo))) {

        andWhere = " DATE_FORMAT(createdAt, '%Y-%m-%d') BETWEEN '" + body.dateFrom + "' AND '" + body.dateTo + "'";
    }

    const openReceive = await _openReceive(andWhere, res);

    const postedReceive = await _postedReceive(andWhere, res);

    const deletedReceive = await _deletedReceive(andWhere, res);

    const cSVData = await _getCSVData(andWhere, res);

    const monthyearArray = [...new Set([...[...new Set([...openReceive.monthyear, ...postedReceive.monthyear])], ...deletedReceive.monthyear])].sort();

    let openReceiveCount = [];
    let postedReceiveCount = [];
    let deletedReceiveCount = [];

    for (a = 0; a < monthyearArray.length; a++) {

        let openFindIndex = openReceive.monthyear.findIndex(element => element === monthyearArray[a]);

        if (openFindIndex !== -1) {

            openReceiveCount.push(openReceive.count[openFindIndex]);
        } else {

            openReceiveCount.push(0);
        }

        let postedFindIndex = postedReceive.monthyear.findIndex(element => element === monthyearArray[a]);

        if (postedFindIndex !== -1) {

            postedReceiveCount.push(postedReceive.count[postedFindIndex]);
        } else {

            postedReceiveCount.push(0);
        }

        let deletedFindIndex = deletedReceive.monthyear.findIndex(element => element === monthyearArray[a]);

        if (deletedFindIndex !== -1) {

            deletedReceiveCount.push(deletedReceive.count[deletedFindIndex]);
        } else {

            deletedReceiveCount.push(0);
        }
    }

    return res.status(200).send({
        data: {
            open: openReceiveCount,
            posted: postedReceiveCount,
            deleted: deletedReceiveCount,
            monthyear: monthyearArray,
            cSVData: cSVData
        }
    })
};

const get = async (req, res, next) => {

    const body = req.body;

    await validation.validateResult(req, res, next);

    _getHandler(body, res);
};

module.exports = {
    get: get
};