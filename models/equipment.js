const Sequelize = require('sequelize')
const db = require('../db');
const Character = require('./character');
const CharacterEquipment = require('./characterEquipment');

const Equipment = db.define('equipment', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    weight: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
Equipment.belongsToMany(Character, { through: CharacterEquipment });
module.exports = Equipment