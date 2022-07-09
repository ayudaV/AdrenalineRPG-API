const db = require('../db')
const Character = require('./character');
const Organization = require('./organization');

const CharacterOrganization = db.define('characterOrganization', {})
Character.belongsToMany(Organization, { through: CharacterOrganization })
Organization.belongsToMany(Character, { through: CharacterOrganization });

module.exports = CharacterOrganization