const Sequelize = require('sequelize')
const db = require('../db');
const Race = require('./race');
const User = require('./user');

const Character = db.define('character', {
    name: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    birthday: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    height: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    weight: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    eyes: {
        type: Sequelize.STRING,
        allowNull: true
    },
    skin: {
        type: Sequelize.STRING,
        allowNull: true
    },
    hair: {
        type: Sequelize.STRING,
        allowNull: true
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true
    },
    inspiration: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    proficiency: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    speed: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    health: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    bonusHealth: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    successes: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    failures: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    strength: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    dexterity: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    constitution: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    intelligence: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    wisdom: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    charisma: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
})
Character.belongsTo(Race, {
    constraint: true,
    allowNull: true,
    foreignKey: 'idRace'
})
Character.belongsTo(User, {
    constraint: true,
    allowNull: true,
    foreignKey: 'idUser'
})
module.exports = Character