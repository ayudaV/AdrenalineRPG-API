const Sequelize = require('sequelize')
const db = require('../db');
const Character = require('./character');
const CharacterOrganization = require('./characterOrganization');

const Organization = db.define('organization', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
Organization.belongsToMany(Character, { through: CharacterOrganization });

module.exports = Organization