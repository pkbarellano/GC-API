module.exports = (db, DataTypes) => {

    return db.define('ReceiveGCDetail', {
        iD: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        receiveGCHeaderID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: false
        },
        gCNumberFrom: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gCNumberTo: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tablename: 'receiveGCDetails',
        timestamps: false
    });
};