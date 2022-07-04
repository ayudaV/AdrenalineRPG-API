const User = require('../models/user')
const multer = require('multer')
const path = require('path')

const getAllUsers = async (req, res) => {
    const users = await User.findAll({
        attributes: ['id','username', 'firstName', 'lastName', 'email', 'birthday', 'image']
    })
    res.status(200).send(users)
}
const getUserById = async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        attributes: ['id','username', 'firstName', 'lastName', 'email', 'birthday', 'image']
    })
    res.status(200).send(user)
}
const getUserByNick = async (req, res) => {
    const user = await User.findOne({
        where: { username: req.params.username},
        attributes: ['id','username', 'firstName', 'lastName', 'email', 'birthday', 'image']
    })
    res.status(200).send(user)
}
const postUser = async (req, res) => {
    let info = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        image: req.file.path
    }
    const user = await User.create(info)
    res.status(200).send(user)
    console.log(user)
}
const putUserById = async (req, res) => {
    const user = await User.update(req.body, { where: { id: req.params.id }})
    res.status(200).send(user)
}
const deleteUserById = async (req, res) => {
    
    await Product.destroy({ where: { id: req.params.id }} )
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

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')

module.exports = {
    getAllUsers,
    getUserById,
    getUserByNick,
    postUser,
    putUserById,
    deleteUserById,
    upload
}