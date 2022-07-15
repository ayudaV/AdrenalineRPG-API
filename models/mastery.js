const Sequelize = require('sequelize')
const db = require('../db')
const Type = require('./type')

const Mastery = db.define('mastery', {
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
    damage: {
        type: Sequelize.STRING,
        allowNull: false
    },
    health: {
        type: Sequelize.STRING,
        allowNull: false
    },
    armor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    strength: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    dexterity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    constitution: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    intelligence: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    wisdom: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    charisma: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
})
Mastery.belongsTo(Type, {
    constraint: true,
    allowNull: false,
    foreignKey: 'idType'
})
module.exports = Mastery