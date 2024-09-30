module.exports = (db, DataTypes) => {

    return db.define('Navigation', {
        iD: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        level: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        navigationName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        directory: {
            type: DataTypes.STRING(30)
        },
        url: {
            type: DataTypes.STRING(50)
        },
        icon: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        hasSub: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        firstLevelID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'navigations',
        timestamps: true,
        paranoid: true
    })
};