const Sequelize = require('sequelize')
const db = require('../db')

const CharacterLanguage = db.define('characterLanguage', {})
module.exports = CharacterLanguage