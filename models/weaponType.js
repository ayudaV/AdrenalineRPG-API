const Sequelize = require('sequelize')
const db = require('../db');

const WeaponType = db.define('weaponType', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
module.exports = WeaponType
