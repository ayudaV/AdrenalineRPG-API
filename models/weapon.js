const Sequelize = require('sequelize')
const db = require('../db');
const Type = require('./type');

const Weapon = db.define('weapon', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    damage: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bonus: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})
Weapon.belongsTo(Type, {
    constraint: true,
    allowNull: false,
    foreignKey: 'idType'
})
module.exports = Weapon