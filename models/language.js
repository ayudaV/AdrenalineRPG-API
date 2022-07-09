const Sequelize = require('sequelize')
const db = require('../db')

const Language = db.define('language', {
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
module.exports = Language