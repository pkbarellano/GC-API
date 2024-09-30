module.exports = (db, DataTypes) => {

    return db.define('GiftCertificate', {
        iD: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        gCNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(1),
            allowNull: false
        }
    }, {
        tableName: 'giftCertificates',
        timestamps: true,
        paranoid: true
    });
};