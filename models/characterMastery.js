const db = require('../db')
const Character = require('./character');
const Mastery = require('./mastery');
const WeaponType = require('./weaponType');

const CharacterMastery = db.define('CharacterMastery', {})
Character.belongsToMany(Mastery, { through: CharacterMastery })
Character.belongsToMany(WeaponType, { through: CharacterMastery })

module.exports = CharacterMastery