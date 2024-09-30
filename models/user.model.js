module.exports = (db, DataTypes) => {

    const Level = require('./level.model')(db, DataTypes);
    const Department = require('./department.model')(db, DataTypes);
    const Group = require('./group.model')(db, DataTypes);
    const Session = require('./session.model')(db, DataTypes);

    const User = db.define('User', {
        iD: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        middleName: {
            type: DataTypes.STRING(50),
        },
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    }, {
        tableName: 'users',
        timestamps: true,
        paranoid: true
    });

    User.belongsToMany(Level, {
        through: 'userConfigurations',
        foreignKey: 'userID',
        otherKey: 'levelID',
        as: 'Level',
        timestamps: false
    });

    User.belongsToMany(Department, {
        through: 'userConfigurations',
        foreignKey: 'userID',
        otherKey: 'departmentID',
        as: 'Department',
        timestamps: false
    });

    User.belongsToMany(Group, {
        through: 'userConfigurations',
        foreignKey: 'userID',
        otherKey: 'groupID',
        as: 'Group',
        timestamps: false
    });

    User.hasMany(Session, {
        foreignKey: 'UserID',
        targetKey: 'iD',
        as: 'Session',
        timestamps: false
    });

    return User;
};