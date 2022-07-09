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
    user ? res.status(200).send(user) : res.status(404).json({ success: false, message: 'User not found.' })
}
const getUserByNick = async (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    const user = await User.findOne({
        where: { username: req.params.username },
        attributes: ['id', 'username', 'firstName', 'lastName', 'email', 'birthday', 'image']
    })
    user ? res.status(200).send(user) : res.status(404).json({ success: false, message: 'User not found.' })
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
            })
                .then(() => res.sendStatus(201))
                .catch(() => res.sendStatus(406))
        })
    })
}
const putUserById = async (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    await User.update(req.body, { where: { id: req.params.id } })
        .then((user) => { user[0] === 1 ? res.sendStatus(200) : res.status(404).json({ success: false, message: 'User not found.' }) })
}
const deleteUserById = async (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    await User.destroy({ where: { id: req.params.id } })
    .then((user) => {user ? res.status(200).send('User was deleted!') : res.status(404).json({ success: false, message: 'User not found.' })}) 
}

const storageUser = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images/Users')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
})
const uploadUser = multer({
    storage: storageUser,
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
    uploadUser
}