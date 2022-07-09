const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config();

const signin = async (req, res) => {
    await User.findOne({ where: { username: req.body.username } }).then(user => {
        if (user === null) {
            res.status(401).json({ message: "Username or Password is Wrong!" })
        } else {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (result) {
                    jwt.sign({
                        username: user.username,
                        id: user.id
                    }, process.env.JWT_SECRET, function (err, token) {
                        res.status(200).json({
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            birthday: user.birthday,
                            image: user.path,
                            token: token
                        })
                    })
                } else { res.status(401).json({ message: "Username or Password is Wrong!" }) }
            })
        }
    }).catch(error => {
        res.status(500).json({ message: "Something Wrong!" + error })
    })
}
module.exports = {
    signin
}