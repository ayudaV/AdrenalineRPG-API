const db = require('../db')
const Character = require('./character');
const Skill = require('./skill');

const CharacterSkill = db.define('characterSkill', {})
Character.belongsToMany(Skill, { through: CharacterSkill })
Skill.belongsToMany(Character, { through: CharacterSkill });

module.exports = CharacterSkill