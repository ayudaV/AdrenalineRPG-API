const Sequelize = require('sequelize')
const db = require('../db')
const Character = require('./character');
const Skill = require('./skill');

const CharacterSkill = db.define('characterSkill', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
})
Character.belongsToMany(Skill, { through: CharacterSkill })
Skill.belongsToMany(Character, { through: CharacterSkill });

module.exports = CharacterSkill