const Sequelize = require('sequelize')
const db = require('../db')
const Character = require('./character');
const Mastery = require('./mastery');

const CharacterMastery = db.define('CharacterMastery', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
})
Character.belongsToMany(Mastery, { through: CharacterMastery })
Mastery.belongsToMany(Character, { through: CharacterMastery })

module.exports = CharacterMastery