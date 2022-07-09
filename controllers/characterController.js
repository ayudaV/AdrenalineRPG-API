const Character = require('../models/character')
const multer = require('multer')
const path = require('path')

const getAllCharacters = async (req, res) => {
    const characters = await Character.findAll()
    res.status(200).send(characters)
}
const getCharacterById = async (req, res) => {
    const character = await Character.findByPk(req.params.id, {
    })
    res.status(200).send(character)
}
const getCharacterByName = async (req, res) => {
    const character = await Character.findOne({
        where: { name: req.params.name },
    })
    res.status(200).send(character)
}
const insertCharacter = async (req, res) => {
    await Character.create({
        name: req.body.name,
        description: req.body.description,
        birthday: req.body.birthday,
        height: req.body.height,
        weight: req.body.weight,
        eyes: req.body.eyes,
        skin: req.body.skin,
        hair: req.body.hair,
        image: req.file.path
    }).then(function () {
        res.sendStatus(201)
    }).catch(function () {
        res.sendStatus(406)
    })
}
const putCharacterById = async (req, res) => {
    const character = await Character.update(req.body, { where: { id: req.params.id } })
    res.status(200).send(character)
}
const deleteCharacterById = async (req, res) => {
    await Product.destroy({ where: { id: req.params.id } })
    res.status(200).send('Character was deleted!')
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
    getAllCharacters,
    getCharacterById,
    getCharacterByName,
    insertCharacter,
    putCharacterById,
    deleteCharacterById,
    upload
}