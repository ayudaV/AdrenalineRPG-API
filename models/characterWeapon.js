const db = require('../db')
const Character = require('./character');
const Weapon = require('./weapon');

const CharacterWeapon = db.define('characterWeapon', {})
Character.belongsToMany(Weapon, { through: CharacterWeapon })
Weapon.belongsToMany(Character, { through: CharacterWeapon });

module.exports = CharacterWeapon