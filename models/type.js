const Sequelize = require('sequelize')
const db = require('../db');

const Type = db.define('type', {
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
module.exports = Type
