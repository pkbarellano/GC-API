module.exports = (db, DataTypes) => {

    return db.define('GroupNavigation', {
        iD: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        groupID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        navigationID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'groupnavigations',
        timestamps: false,
        paranoid: false
    });
};