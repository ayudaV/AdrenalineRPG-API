const Sequelize = require('sequelize')
const db = require('../db');
const CharacterEquipment = require('./characterEquipment');
const CharacterSkill = require('./characterSkill');
const CharacterWeapon = require('./characterWeapon');
const CharacterLanguage = require('./characterLanguage');

const Equipment = require('./equipment');
const Race = require('./race');
const Skill = require('./skill');
const User = require('./user');
const Weapon = require('./weapon');
const Organization = require('./organization');
const Language = require('./language');

const Character = db.define('character', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    birthday: {
        type: Sequelize.DATE,
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
    maxHealth: {
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
    healthDice: {
        type: Sequelize.STRING,
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
    foreignKey: 'id'
})
Character.belongsTo(User, {
    constraint: true,
    allowNull: false,
    foreignKey: 'id'
})
Character.belongsToMany(Skill, { through: CharacterSkill })
Character.belongsToMany(Weapon, { through: CharacterWeapon })
Character.belongsToMany(Equipment, { through: CharacterEquipment })
Character.belongsToMany(Organization, { through: CharacterEquipment })
Character.belongsToMany(Language, { through: CharacterLanguage })

module.exports = Character