module.exports = (db, DataTypes) => {

    const ReceiveGCDetail = require('./receiveGCDetail.model')(db, DataTypes);
    const User = require('./user.model')(db, DataTypes);

    const ReceiveGCHeader = db.define('ReceiveGCHeader', {
        iD: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        controlNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pONumber: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        dRNumber: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        vendorName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        remarks: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(1),
            allowNull: false
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'receiveGCHeaders',
        timestamps: true,
        paranoid: true
    });

    ReceiveGCHeader.hasMany(ReceiveGCDetail, {
        foreignKey: 'receiveGCHeaderID',
        targetKey: 'iD',
        as: 'ReceiveGCDetail',
        timestamps: false
    });

    ReceiveGCHeader.belongsTo(User, {
        foreignKey: 'userID',
        targetKey: 'iD',
        as: 'User',
        timestamps: false
    });

    return ReceiveGCHeader;
};