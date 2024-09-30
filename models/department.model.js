module.exports = (db, DataTypes) => {

    return db.define('Department', {
        iD: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        departmentName: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    }, {
        tableName: 'departments',
        timestamps: true,
        paranoid: true
    });
};