const db = require('../db');
const Character = require('./character');
const Equipment = require('./equipment');

const CharacterEquipment = db.define('characterEquipment', {})
Character.belongsToMany(Equipment, { through: CharacterEquipment })
Equipment.belongsToMany(Character, { through: CharacterEquipment });

module.exports = CharacterEquipment