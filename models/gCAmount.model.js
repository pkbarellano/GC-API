module.exports = (db, DataTypes) => {

    return db.define('GCAmount', {
        iD: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: false
        }
    }, {
        tablename: 'gCAmounts',
        timestamps: true,
        paranoid: true
    });
};