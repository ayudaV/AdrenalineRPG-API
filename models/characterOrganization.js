const Sequelize = require('sequelize')
const db = require('../db')

const CharacterOrganization = db.define('characterOrganization', {})
module.exports = CharacterOrganization