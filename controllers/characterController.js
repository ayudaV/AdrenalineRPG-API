const Character = require('../models/character')
const multer = require('multer')
const path = require('path')

const getAllCharacters = async (req, res) => {
    const characters = await Character.findAll({
    })
    res.status(200).send(characters)
}
const getCharacterById = async (req, res) => {
    const character = await Character.findByPk(req.params.id, {
    })
    character ? res.status(200).send(character) : res.status(404).json({ success: false, message: 'Character not found.' })
}
const getCharacterByName = async (req, res) => {
    if (!req.character) return res.status(401).json({ success: false, message: 'Invalid character to access it.' })
    const character = await Character.findOne({
        where: { charactername: req.params.charactername },
    })
    character ? res.status(200).send(character) : res.status(404).json({ success: false, message: 'Character not found.' })
}
const insertCharacter = async (req, res) => {
    await Character.create({
        name : req.body.name,
        description : req.body.description,
        image: req.file.image,
        //birthday : req.body.birthday,
        //height : req.body.height,
        weight : req.body.weight,
        eyes : req.body.eyes,
        skin : req.body.skin,
        hair : req.body.hair,
        inspiration : req.body.inspiration,
        proficiency : req.body.proficiency,
        speed : req.body.speed,
        health : req.body.health,
        bonusHealth : req.body.bonusHealth,
        successes : req.body.successes,
        failures : req.body.failures,
        strength : req.body.strength,
        dexterity : req.body.dexterity,
        constitution : req.body.constitution,
        intelligence : req.body.intelligence,
        wisdom : req.body.wisdom,
        charisma : req.body.charisma,
        idRace : req.body.idRace,
        idUser : req.body.idUser
    })
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(406))
}
const putCharacterById = async (req, res) => {
    if (!req.character) return res.status(401).json({ success: false, message: 'Invalid character to access it.' })
    await Character.update(req.body, { where: { id: req.params.id } })
        .then((character) => { character[0] === 1 ? res.sendStatus(200) : res.status(404).json({ success: false, message: 'Character not found.' }) })
}
const deleteCharacterById = async (req, res) => {
    if (!req.character) return res.status(401).json({ success: false, message: 'Invalid character to access it.' })
    await Character.destroy({ where: { id: req.params.id } })
        .then((character) => { character ? res.status(200).send('Character was deleted!') : res.status(404).json({ success: false, message: 'Character not found.' }) })
}

const storageCharacter = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images/Characters')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
})
const uploadCharacter = multer({
    storage: storageCharacter,
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
    uploadCharacter
}