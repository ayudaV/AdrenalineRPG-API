const Sequelize = require('sequelize')
const db = require('../db');
const Character = require('./character');
const CharacterWeapon = require('./characterWeapon');

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
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
Weapon.belongsToMany(Character, { through: CharacterWeapon });
module.exports = Weapon