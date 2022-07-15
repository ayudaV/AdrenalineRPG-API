const Sequelize = require('sequelize')
const db = require('../db')
const Character = require('./character');
const Weapon = require('./weapon');

const CharacterWeapon = db.define('characterWeapon', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
})
Character.belongsToMany(Weapon, { through: CharacterWeapon })
Weapon.belongsToMany(Character, { through: CharacterWeapon });

module.exports = CharacterWeapon