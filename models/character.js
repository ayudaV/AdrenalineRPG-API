const Sequelize = require('sequelize')
const db = require('../db');
const Race = require('./race');
const User = require('./user');

const Character = db.define('character', {
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
        allowNull: false,
    },
    birthday: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    height: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    weight: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    eyes: {
        type: Sequelize.STRING,
        allowNull: false
    },
    skin: {
        type: Sequelize.STRING,
        allowNull: false
    },
    hair: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    inspiration: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    proficiency: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    speed: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    health: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    bonusHealth: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    bonusArmor: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    successes: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    failures: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    adrenaline: {
        type: Sequelize.INTEGER,
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
Character.belongsTo(Race, {
    constraint: true,
    allowNull: false,
    foreignKey: 'idRace'
})
Character.belongsTo(User, {
    constraint: true,
    allowNull: false,
    foreignKey: 'idUser'
})

module.exports = Character