module.exports = (db, DataTypes) => {

    return db.define('ControlNumber', {
        iD: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            primaryKey: true,
            allowNull: false
        },
        receiveControlNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        allocateControlNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        saleControlNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        redeemControlNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'controlNumbers',
        timestamps: false
    });
}