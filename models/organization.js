const Sequelize = require('sequelize')
const db = require('../db');

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
module.exports = Organization