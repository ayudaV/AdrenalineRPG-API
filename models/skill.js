const Sequelize = require('sequelize')
const db = require('../db');

const Skill = db.define('skill', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    atribute: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
module.exports = Skill