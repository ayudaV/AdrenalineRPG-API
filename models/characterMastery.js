const db = require('../db')
const Character = require('./character');
const Mastery = require('./mastery');

const CharacterMastery = db.define('CharacterMastery', {})
Character.belongsToMany(Mastery, { through: CharacterMastery })
Mastery.belongsToMany(Character, { through: CharacterMastery })

module.exports = CharacterMastery