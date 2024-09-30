module.exports = (db, DataTypes) => {

    return db.define('UserConfiguration', {
        iD: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        levelID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        departmentID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        groupID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'userconfigurations'
    });
};