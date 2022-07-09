const Sequelize = require('sequelize')
const db = require('../db')

const Mastery = db.define('mastery', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bonus: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})
module.exports = Mastery