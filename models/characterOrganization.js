const Sequelize = require('sequelize')
const db = require('../db')
const Character = require('./character');
const Organization = require('./organization');

const CharacterOrganization = db.define('characterOrganization', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
})
Character.belongsToMany(Organization, { through: CharacterOrganization })
Organization.belongsToMany(Character, { through: CharacterOrganization });

module.exports = CharacterOrganization