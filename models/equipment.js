const Sequelize = require('sequelize')
const db = require('../db');

const Equipment = db.define('equipment', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    weight: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
})
module.exports = Equipment