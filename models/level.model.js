module.exports = (db, DataTypes) => {

    return db.define('Level', {
        iD: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        levelNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        levelName: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }, {
        tableName: 'levels',
        timestamps: true,
        paranoid: true
    });
};