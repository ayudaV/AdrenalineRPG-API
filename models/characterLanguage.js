const Sequelize = require('sequelize')
const db = require('../db')
const Language = require('./language');
const Character = require('./character')

const CharacterLanguage = db.define('characterLanguage', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
})
Character.belongsToMany(Language, { through: CharacterLanguage })
Language.belongsToMany(Character, { through: CharacterLanguage })

module.exports = CharacterLanguage