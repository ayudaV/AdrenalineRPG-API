const Sequelize = require('sequelize')
const db = require('../db');
const WeaponType = require('./weaponType');

const Weapon = db.define('weapon', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    damege: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bonus: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})
Weapon.belongsTo(WeaponType, {
    constraint: true,
    allowNull: false,
    foreignKey: 'id'
})
module.exports = Weapon