const db = require('../db')
const Language = require('./language');
const Character = require('./character')

const CharacterLanguage = db.define('characterLanguage', {})
Character.belongsToMany(Language, { through: CharacterLanguage })
Language.belongsToMany(Character, { through: CharacterLanguage })

module.exports = CharacterLanguage