const Sequelize = require('sequelize')
const db = require('../db');
const Type = require('./type');

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
})
Equipment.belongsTo(Type, {
    constraint: true,
    allowNull: false,
    foreignKey: 'idType'
})
module.exports = Equipment