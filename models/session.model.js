module.exports = (db, DataTypes) => {

    return db.define('Session', {
        iD: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        apiKey: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'sessions',
        timestamps: true,
        paranoid: true
    });
};