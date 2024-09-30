module.exports = (db, DataTypes) => {

    const Navigation = require('./navigation.model')(db, DataTypes);

    const Group = db.define('Group', {
        iD: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        groupName: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    }, {
        tableName: 'groups',
        timestamps: true,
        paranoid: true
    });

    Group.belongsToMany(Navigation, {
        through: 'groupNavigations',
        foreignKey: 'groupID',
        otherKey: 'navigationID',
        as: 'Navigation',
        timestamps: false
    })

    return Group;
};

