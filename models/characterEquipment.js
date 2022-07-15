const Sequelize = require('sequelize')
const db = require('../db');
const Character = require('./character');
const Equipment = require('./equipment');

const CharacterEquipment = db.define('characterEquipment', {    
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
})

Character.belongsToMany(Equipment, { through: CharacterEquipment })
Equipment.belongsToMany(Character, { through: CharacterEquipment });

module.exports = CharacterEquipment