const Sequelize = require('sequelize')
const db = require('../db')

const Race = db.define('race', {
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
module.exports = Race