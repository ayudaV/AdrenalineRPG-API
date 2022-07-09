const Sequelize = require('sequelize')
const db = require('../db');
const Character = require('./character');
const CharacterSkill = require('./characterSkill');

const Skill = db.define('skill', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    atribute: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
Skill.belongsToMany(Character, { through: CharacterSkill });
module.exports = Skill