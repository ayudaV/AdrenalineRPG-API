const Character = require('../models/character')
const CharacterEquipment = require('../models/characterEquipment')
const CharacterLanguage = require('../models/characterLanguage')
const CharacterMastery = require('../models/characterMastery')
const CharacterOrganization = require('../models/characterOrganization')
const CharacterSkill = require('../models/characterSkill')
const CharacterWeapon = require('../models/characterWeapon')

const multer = require('multer')
const path = require('path')

const getAllCharacters = async (req, res) => {
    if (!req.user || (req.user.role != "Admin" && req.user.role != "Master")) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    const characters = await Character.findAll({
    })
    res.status(200).send(characters)
}
const getCharacterById = async (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    const character = await Character.findByPk(req.params.id, {
    })
    character ? res.status(200).send(character) : res.status(404).json({ success: false, message: 'Character not found.' })
}
const getCharacterByName = async (req, res) => {
    if (!req.user || (req.user.role != "Admin" && req.user.role != "Master")) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    if (req.user.id != 1) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    const character = await Character.findOne({
        where: { name: req.params.name },
    })
    character ? res.status(200).send(character) : res.status(404).json({ success: false, message: 'Character not found.' })
}
const insertCharacter = async (req, res) => {
    if (!req.user || (req.user.role != "Admin" && req.user.id != req.body.idUser)) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    await Character.create({
        name: req.body.name,
        description: req.body.description,
        birthday: req.body.birthday,
        height: req.body.height,
        weight: req.body.weight,
        eyes: req.body.eyes,
        skin: req.body.skin,
        hair: req.body.hair,
        inspiration: req.body.inspiration,
        proficiency: req.body.proficiency,
        speed: req.body.speed,
        health: req.body.health,
        bonusHealth: req.body.bonusHealth,
        bonusArmor: req.body.bonusArmor,
        successes: req.body.successes,
        failures: req.body.failures,
        strength: req.body.strength,
        dexterity: req.body.dexterity,
        constitution: req.body.constitution,
        intelligence: req.body.intelligence,
        wisdom: req.body.wisdom,
        charisma: req.body.charisma,
        idRace: req.body.idRace,
        idUser: req.body.idUser,
        image: req.file.path
    })
        .then(function () {
            res.sendStatus(201);
        })
        .catch(function () {
            res.sendStatus(406);
        });
}
const putCharacterById = async (req, res) => {
    if (!req.user || (req.user.role != "Admin" && req.user.id != req.params.id)) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    await Character.update(req.body, { where: { id: req.params.id } })
        .then((character) => { character[0] === 1 ? res.sendStatus(200) : res.status(404).json({ success: false, message: 'Character not found.' }) })
}
const updateImageById = async (req, res) => {
    if (!req.user || (req.user.role != "Admin" && req.user.id != req.params.id)) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    await Character.update({image : req.file.path}, { where: { id: req.params.id } })
        .then((character) => { character[0] === 1 ? res.sendStatus(200) : res.status(404).json({ success: false, message: 'Character not found.' }) })
}
const deleteCharacterById = async (req, res) => {
    if (!req.user || (req.user.role != "Admin" && req.user.id != req.params.id)) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
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
    uploadCharacter,
    updateImageById
}