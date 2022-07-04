const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    birthday: {
        type: Sequelize.DATE,
        allowNull: true
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true
    }

})
module.exports = User