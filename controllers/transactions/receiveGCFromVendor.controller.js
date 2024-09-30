const db = require('../../models');
const { Op, Sequelize } = require('sequelize');
const SequelizeDB = db.sequelizeDB;
const User = db.user;
const ReceiveGCHeader = db.receiveGCHeader;
const ReceiveGCDetail = db.receiveGCDetail;
const Session = db.session;
const GiftCertificate = db.giftCertificate;
const validation = require('../../helpers/validation.helper');

const _getAllPendingReceiveGC = (req, res) => {

    let orderColumn;

    switch (req.orderColumn) {
        case 'controlNumber':
            orderColumn = 'controlNumber';
            break;
        case 'descripton':
            orderColumn = 'description';
            break;
        case 'gCNumberFrom':
            orderColumn = 'ReceiveGCDetail.gCNumberFrom';
            break;
        case 'gCNumberTo':
            orderColumn = 'ReceiveGCDetail.gCNumberTo';
            break;
        case 'amount':
            orderColumn = 'ReceiveGCDetail.amount';
            break;
        default:
            orderColumn = 'controlNumber';
    }

    const limit = req.show;
    const offset = (req.page * limit) - limit;

    return { count, rows } = ReceiveGCHeader.findAndCountAll({
        attributes: ['iD', 'controlNumber', 'remarks'],
        include: [
            {
                association: 'ReceiveGCDetail',
                attributes: ['gCNumberFrom', 'gCNumberTo', 'amount'],
                required: false,
                subQuery: false
            }
        ],
        where: {
            [Op.and]: [
                { status: 'O' },
                {
                    [Op.or]: [
                        {
                            'controlNumber': { [Op.like]: '%' + req.search + '%' }
                        },
                        {
                            'remarks': { [Op.like]: '%' + req.search + '%' }
                        },
                        {
                            '$ReceiveGCDetail.gCNumberFrom$': { [Op.like]: '%' + req.search + '%' }
                        },
                        {
                            '$ReceiveGCDetail.gCNumberTo$': { [Op.like]: '%' + req.search + '%' }
                        },
                        {
                            '$ReceiveGCDetail.amount$': { [Op.like]: '%' + req.search + '%' }
                        }
                    ]
                }
            ]
        },
        limit: limit,
        offset: offset,
        order: [Sequelize.literal(orderColumn + ' ' + req.orderDirection)],
        subQuery: false
    }).then(data => {

        return data;
    }).catch(error => {

        console.log(error);

        return res.status(422).send({
            message: 'Encountered an application error while attempting to retrieve receive gift certificate details. Please retry or contact your administrator for assistance.'
        });
    });
};

const _getUser = (apiKey, res) => {

    return User.findOne({
        attributes: ['iD'],
        include: [
            {
                association: 'Session',
                attributes: [],
                where: {
                    apiKey: apiKey
                },
                required: true
            }
        ]
    }).then(data => {

        return data;
    }).catch(error => {

        console.log(error);

        return res.status(422).send({
            message: 'Encountered an application error while attempting to retrieve user detail. Please retry or contact your administrator for assistance.'
        });
    });
};

const _getUserPendingReceiveGC = (userID, req, res) => {

    switch (req.orderColumn) {
        case 'controlNumber':
            orderColumn = 'controlNumber';
            break;
        case 'descripton':
            orderColumn = 'description';
            break;
        case 'gCNumberFrom':
            orderColumn = 'ReceiveGCDetail.gCNumberFrom';
            break;
        case 'gCNumberTo':
            orderColumn = 'ReceiveGCDetail.gCNumberTo';
            break;
        case 'amount':
            orderColumn = 'ReceiveGCDetail.amount';
            break;
        default:
            orderColumn = 'controlNumber';
    }

    const limit = req.show;
    const offset = (req.page * limit) - limit;

    return ReceiveGCHeader.findAndCountAll({
        attributes: ['iD', 'controlNumber', 'remarks'],
        include: [
            {
                association: 'ReceiveGCDetail',
                attributes: ['gCNumberFrom', 'gCNumberTo', 'amount'],
                required: false,
                subQuery: false
            }
        ],
        where: {
            [Op.and]: [
                { userID: userID },
                { status: 'O' },
                {
                    [Op.or]: [
                        {
                            'controlNumber': { [Op.like]: '%' + req.search + '%' }
                        },
                        {
                            'remarks': { [Op.like]: '%' + req.search + '%' }
                        },
                        {
                            '$ReceiveGCDetail.gCNumberFrom$': { [Op.like]: '%' + req.search + '%' }
                        },
                        {
                            '$ReceiveGCDetail.gCNumberTo$': { [Op.like]: '%' + req.search + '%' }
                        },
                        {
                            '$ReceiveGCDetail.amount$': { [Op.like]: '%' + req.search + '%' }
                        }
                    ]
                }
            ]
        },
        limit: limit,
        offset: offset,
        order: [Sequelize.literal(orderColumn + ' ' + req.orderDirection)],
        subQuery: false
    }).then(data => {

        return data;
    }).catch(error => {

        console.log(error);

        return res.status(422).send({
            message: 'Encountered an application error while attempting to retrieve receive gift certificate details. Please retry or contact your administrator for assistance.'
        });
    });
};

const _getPendingReceiveGC = async (req, res, next) => {

    const user = await _getUser(req.apiKey, res);

    if ([1, 2].includes(req.levelNumber)) {

        receiveGC = await _getAllPendingReceiveGC(req, res);
    } else {

        receiveGC = await _getUserPendingReceiveGC(user.iD, req, res);
    }

    const receiveGCData = receiveGC.rows.map((header) => {

        for (let i = 0; i < header.ReceiveGCDetail.length; i++) {

            return [header.iD, header.controlNumber, header.remarks, header.ReceiveGCDetail[i].gCNumberFrom, header.ReceiveGCDetail[i].gCNumberTo, header.ReceiveGCDetail[i].amount];
        }
    });

    receiveGCResult = {
        data: receiveGCData,
        show: req.show,
        page: req.page,
        total: receiveGC.count,
        totalPage: Math.ceil(receiveGC.count / req.show)
    }

    res.status(200).send({
        apiKey: req.apiKey,
        levelNumber: req.levelNumber,
        data: receiveGCResult
    });

};

const get = async (req, res, next) => {

    const body = req.body;

    await validation.validateResult(req, res, next);

    _getPendingReceiveGC(body, res, next);
};

const _getSessionUserID = apiKey => {

    return Session.findOne({
        attributes: ['userID'],
        where: {
            apiKey: apiKey
        }
    }).then(data => {

        if (data === null) {

            const response = {
                status: false,
                message: "No client record found."
            };

            return res.status(200).send(response);
        } else {

            return data;
        }
    }).catch(error => {

        console.log(error);

        res.status(422).send({
            message: 'Encountered an application error while attempting to retrieve user detail. Please retry or contact your administrator for assistance.'
        });

        return;
    });
};

const _getExistingHeader = body => {

    return ReceiveGCHeader.count({
        where: {
            controlNumber: body.controlNumber
        }
    });
};

const _getExistingDetail = body => {

    return ReceiveGCDetail.count({
        where: {
            [Op.or]: [
                {
                    'gCNumberFrom': { [Op.between]: [body.gCNumberFrom, body.gCNumberTo] }
                },
                {
                    'gCNumberTo': { [Op.between]: [body.gCNumberFrom, body.gCNumberTo] }
                }
            ]
        }
    });
};

const _createHeader = (userID, body, t) => {

    return ReceiveGCHeader.create({
        controlNumber: body.controlNumber,
        pONumber: body.pONumber,
        dRNumber: body.dRNumber,
        vendorName: body.vendorName,
        remarks: body.remarks,
        status: 'O',
        userID: userID
    }, {
        transaction: t
    }).then(response => {
        return response;
    }).catch(error => {

        console.log(error);

        res.status(422).send({
            message: 'Encountered an application error while attempting to register received gift certificate. Please retry or contact your administrator for assistance.'
        });

        return;
    });
};

const _createDetail = (headerID, body, t) => {

    return ReceiveGCDetail.create({
        receiveGCHeaderID: headerID,
        amount: body.amount,
        gCNumberFrom: body.gCNumberFrom,
        gCNumberTo: body.gCNumberTo
    }, {
        transaction: t
    }).then(response => {
        return response;
    }).catch(error => {

        console.log(error);

        return res.status(422).send({
            message: 'Encountered an application error while attempting to register received gift certificate detail. Please retry or contact your administrator for assistance.'
        });
    });
};

const _updateHeader = (userID, body, res) => {

    return ReceiveGCHeader.update({
        pONumber: body.pONumber,
        dRNumber: body.dRNumber,
        vendorName: body.vendorName,
        remarks: body.remarks,
        status: 'O'
    }, {
        where: {
            [Op.and]: [
                { userID: userID },
                { iD: body.iD }
            ]
        }
    })
        .then(response => {

            if (!response) {

                const response = {
                    status: false,
                    message: 'Header update was unsuccessful.'
                };

                console.log(error);

                return res.status(200).send(response);
            }

            return;
        })
        .catch(error => {

            console.log(error);

            res.status(422).send({
                message: 'Encountered an application error while attempting to update header. Please retry or contact your administrator for assistance.'
            });

            return;
        });
};

const _updateDetail = (body, res) => {

    return ReceiveGCDetail.update({
        amount: body.amount,
        gCNumberFrom: body.gCNumberFrom,
        gCNumberTo: body.gCNumberTo,
    }, {
        where: {
            receiveGCHeaderID: body.iD
        }
    })
        .then(response => {

            if (!response) {

                console.log(error);

                res.status(422).send({
                    message: 'Encountered an application error while attempting to update detail. Please retry or contact your administrator for assistance.'
                });

                return;
            }

            return;
        })
        .catch(error => {

            console.log(error);

            return res.status(422).send({
                message: 'Encountered an application error while attempting to update detail. Please retry or contact your administrator for assistance.'
            });
        });
};

const _rollbackHeaderDetail = controlNumber => {

    ReceiveGCHeader.destroy({
        where: { controlNumber: controlNumber }
    });
};

const _createReceiveGCFromVendor = async (body, res) => {

    const user = await _getSessionUserID(body.apiKey);

    const headerCount = await _getExistingHeader(body);

    const detailCount = await _getExistingDetail(body);

    let header;

    let detail;

    if (headerCount === 0) {

        if (detailCount === 0) {

            await SequelizeDB.transaction(async t => {

                header = await _createHeader(user.userID, body, t);

                detail = await _createDetail(header.iD, body, t);
            });
        } else {

            res.status(200).send({
                status: false,
                message: "Some GC Number can be found within the list."
            });

            return;
        }
    } else {

        res.status(200).send({
            status: false,
            message: "An active control number already exists. Please void this transaction and generate a new one."
        });

        return;
    }

    if (!header || !detail) {

        _rollbackHeaderDetail(body.controlNumber);

        res.status(422).send({
            message: 'Encountered an application error while attempting to register received gift certificate. Please retry or contact your administrator for assistance.'
        });

        return;
    }

    res.status(200).send({
        status: true,
        message: "Received GC from vendor was successfully submitted."
    });

    return;
};

const create = async (req, res, next) => {

    const body = req.body;

    await validation.validateResult(req, res, next);

    _createReceiveGCFromVendor(body, res);
};

const _findOneDetail = (iD, levelNumber, userID, res) => {

    const userIDParam = ([1, 2].includes(levelNumber) === true) ? {} : { userID: userID };

    return ReceiveGCHeader.findOne({
        attributes: ['controlNumber', 'pONumber', 'dRNumber', 'vendorName', 'remarks'],
        include: [
            {
                association: 'ReceiveGCDetail',
                attributes: ['gCNumberFrom', 'gCNumberTo', 'amount'],
                required: false
            }
        ],
        where: {
            [Op.and]: [
                { status: 'O' },
                { iD: iD },
                userIDParam
            ]
        }
    }).then(data => {

        if (data === null) {

            res.status(200).send({
                status: false,
                message: 'No record found.'
            });

            return;
        } else {

            return data;
        }

    }).catch(error => {

        console.log(error);

        res.status(422).send({
            message: 'Encountered an application error while attempting to retrieve receive gift certificate details. Please retry or contact your administrator for assistance.'
        });

        return;
    });
};

const _getPendingReceiveGCDetail = async (apiKey, iD, levelNumber, res) => {

    const user = await _getUser(apiKey, res);

    const gCDetail = await _findOneDetail(iD, levelNumber, user.iD, res);

    const data = {
        controlNumber: gCDetail.controlNumber,
        pONumber: gCDetail.pONumber,
        dRNumber: gCDetail.dRNumber,
        vendorName: gCDetail.vendorName,
        remarks: gCDetail.remarks,
        gCNumberFrom: gCDetail.ReceiveGCDetail[0].gCNumberFrom,
        gCNumberTo: gCDetail.ReceiveGCDetail[0].gCNumberTo,
        amount: gCDetail.ReceiveGCDetail[0].amount,
    };

    res.status(200).send({
        status: true,
        data: data
    });
}

const getUpdate = async (req, res, next) => {

    const body = req.body;

    await validation.validateResult(req, res, next);

    _getPendingReceiveGCDetail(body.apiKey, body.iD, body.levelNumber, res);
};

const _updateReceiveGCFromVendor = async (body, res, next) => {

    const user = await _getUser(body.apiKey, res);

    await _updateHeader(user.iD, body, res);

    await _updateDetail(body, res);

    res.status(200).send({
        status: true,
        message: "The header and details have been updated successfully.",
        data: body
    });
}

const update = async (req, res, next) => {

    const body = req.body;

    await validation.validateResult(req, res, next);

    _updateReceiveGCFromVendor(body, res, next);
};

const _updatePostReceive = (iD, res, t) => {

    return ReceiveGCHeader.update({
        status: "P"
    }, {
        transaction: t,
        where: {
            iD: iD
        }
    }).then(response => {

        if (!response) {

            const response = {
                status: false,
                message: 'No updates were made to records during the posting process.'
            };

            return res.status(200).send(response);
        }

        return response;
    }).catch(error => {

        console.log(error);

        return res.status(422).send({
            message: 'Encountered an application error while attempting to post process. Please retry or contact your administrator for assistance.'
        });
    });
};

const _getReceiveGCDetails = (iD, res) => {

    return ReceiveGCHeader.findAndCountAll({
        attributes: [],
        include: [
            {
                association: 'ReceiveGCDetail',
                attributes: ['gCNumberFrom', 'gCNumberTo', 'amount'],
                required: true
            }
        ],
        where: {
            iD: iD,
            status: 'O'
        }
    }).then(response => {

        return response;
    }).catch(error => {

        console.log(error);

        return res.status(422).send({
            message: 'Encountered an application error while attempting to retrieve gift certificate details. Please retry or contact your administrator for assistance.'
        });
    });
}

const _countExistingGiftCertificate = (gCs, res) => {

    const test = GiftCertificate.findAndCountAll({
        where: {
            [Op.or]: gCs
        }
    }).then(response => {

        if (!response) {

            res.status(200).send({
                status: false,
                message: 'Unable to locate a pre-existing record.'
            });
        }

        return response;
    }).catch(error => {

        console.log(error);

        return res.status(422).send({
            message: 'Encountered an application error while attempting to locate a pre-existing record. Please retry or contact your administrator for assistance.'
        });
    });

    return test;
};

const _createGiftCertificate = (gCs, res) => {

    GiftCertificate.bulkCreate(gCs).then(response => {

        return response;
    }).catch(error => {

        console.log(error);

        return res.status(422).send({
            message: 'Encountered an application error while attempting to add a gift certificate. Please retry or contact your administrator for assistance.'
        });
    });

};

const _postReceiveHandler = async (body, res, next) => {

    const gCReceiveDetails = await _getReceiveGCDetails(body.iD, res);

    if (gCReceiveDetails.count < 1) {

        return res.status(200).send({
            status: false,
            message: 'No details were found within the records.'
        });
    }

    await SequelizeDB.transaction(async t => {

        await _updatePostReceive(body.iD, res, t);

        let gCs = [];

        gCReceiveDetails.rows.map(item => {

            for (let i = 0; i < item.ReceiveGCDetail.length; i++) {

                for (let x = item.ReceiveGCDetail[i].gCNumberFrom; x <= item.ReceiveGCDetail[i].gCNumberTo; x++) {

                    gCs.push({
                        amount: item.ReceiveGCDetail[i].amount,
                        gCNumber: x
                    });
                }
            }
        });

        const findAndCountGCs = await _countExistingGiftCertificate(gCs, res);

        if (findAndCountGCs.count > 0) {

            res.status(200).send({
                status: false,
                message: `Gift Certificate ${findAndCountGCs.rows[0].gCNumber} is already present in the list.`
            });

            return t.rollback();
        }

        _createGiftCertificate(gCs, res);

        return res.status(200).send({
            status: true,
            message: 'Successfully posted Gift Certificates.'
        });
    });
};

const postReceive = async (req, res, next) => {

    const body = req.body;

    await validation.validateResult(req, res, next);

    _postReceiveHandler(body, res, next);
};

const _destroyReceiveGC = (iD, res, t) => {

    ReceiveGCHeader.destroy({
        where: {
            iD: iD,
            status: 'O'
        }
    }, {
        transaction: t
    }).then(response => {

        return response;
    }).catch(error => {

        console.log(error);

        return res.status(422).send({
            message: 'Encountered an application error while attempting to delete receive gift certificate details. Please retry or contact your administrator for assistance.'
        });
    });
};

const _deletReceiveHandler = async (body, res) => {

    const gCReceiveDetails = await _getReceiveGCDetails(body.iD, res);

    if (gCReceiveDetails.count < 1) {

        return res.status(200).send({
            status: false,
            message: 'No details were found within the records.'
        });
    }

    await SequelizeDB.transaction(async t => {

        await _destroyReceiveGC(body.iD, res, t);
    });

    return res.status(200).send({
        status: true,
        message: 'The deletion of the transaction was successful.'
    });
};

const deleteReceive = async (req, res, next) => {

    const body = req.body;

    await validation.validateResult(req, res, next);

    _deletReceiveHandler(body, res);
};

module.exports = {
    get: get,
    create: create,
    getUpdate: getUpdate,
    update: update,
    postReceive: postReceive,
    deleteReceive: deleteReceive
};