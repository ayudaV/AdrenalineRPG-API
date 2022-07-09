const Sequelize = require('sequelize')
const db = require('../db')

const CharacterEquipment = db.define('characterEquipment', {})
module.exports = CharacterEquipment