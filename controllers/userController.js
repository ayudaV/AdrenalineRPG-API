const User = require('../models/user')
const multer = require('multer')
const path = require('path')
const bcrypt = require('bcryptjs')

const getAllUsers = async (req, res) => {
    const users = await User.findAll({
        attributes: ['id', 'username', 'firstName', 'lastName', 'email', 'birthday', 'image']
    })
    res.status(200).send(users)
}
const getUserById = async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        attributes: ['id', 'username', 'firstName', 'lastName', 'email', 'birthday', 'image']
    })
    res.status(200).send(user)
}
const getUserByNick = async (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    const user = await User.findOne({
        where: { username: req.params.username },
        attributes: ['id', 'username', 'firstName', 'lastName', 'email', 'birthday', 'image']
    })
    res.status(200).send(user)
}
const signup = async (req, res) => {
    console.log(req.body);
    //Criptografa a Senha do usuario
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, async function (err, hash) {
            await User.create({
                username: req.body.username,
                password: hash,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                birthday: req.body.birthday,
                image: req.file.path
            }).then(function () {
                res.sendStatus(201)
            }).catch(function () {
                res.sendStatus(406)
            })
        })
    })
}
const putUserById = async (req, res) => {
    const user = await User.update(req.body, { where: { id: req.params.id } })
    res.status(200).send(user)
}
const deleteUserById = async (req, res) => {

    await Product.destroy({ where: { id: req.params.id } })
    res.status(200).send('User was deleted!')
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')

module.exports = {
    getAllUsers,
    getUserById,
    getUserByNick,
    signup,
    putUserById,
    deleteUserById,
    upload
}