const Weapon = require('../models/weapon')
const multer = require('multer')
const path = require('path')

const getAllWeapons = async (req, res) => {
    if (!req.user || (req.user.role != "Admin" && req.user.role != "Master")) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    const weapons = await Weapon.findAll({
    })
    res.status(200).send(weapons)
}
const getWeaponById = async (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    const weapon = await Weapon.findByPk(req.params.id, {
    })
    weapon ? res.status(200).send(weapon) : res.status(404).json({ success: false, message: 'Weapon not found.' })
}
const getWeaponByName = async (req, res) => {
    if (!req.user || (req.user.role != "Admin" && req.user.role != "Master")) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    if (!req.weapon) return res.status(401).json({ success: false, message: 'Invalid weapon to access it.' })
    const weapon = await Weapon.findOne({
        where: { name: req.params.name },
    })
    weapon ? res.status(200).send(weapon) : res.status(404).json({ success: false, message: 'Weapon not found.' })
}
const insertWeapon = async (req, res) => {
    if (!req.user || (req.user.role != "Admin" && req.user.role != "Master")) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    await Weapon.create({
        name: req.body.name,
        description: req.body.description,
        damage: req.body.damage,
        bonus: req.body.bonus,
        idType: req.body.idType,
        image: req.file.path
    })
        .then(function () {
            res.sendStatus(201);
        })
        .catch(function () {
            res.sendStatus(406);
        });
}
const putWeaponById = async (req, res) => {
    if (!req.user || (req.user.role != "Admin" && req.user.role != "Master")) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    await Weapon.update(req.body, { where: { id: req.params.id } })
        .then((weapon) => { weapon[0] === 1 ? res.sendStatus(200) : res.status(404).json({ success: false, message: 'Weapon not found.' }) })
}
const deleteWeaponById = async (req, res) => {
    if (!req.user || (req.user.role != "Admin" && req.user.role != "Master")) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    await Weapon.destroy({ where: { id: req.params.id } })
        .then((weapon) => { weapon ? res.status(200).send('Weapon was deleted!') : res.status(404).json({ success: false, message: 'Weapon not found.' }) })
}

const storageWeapon = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images/Weapons')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
})
const uploadWeapon = multer({
    storage: storageWeapon,
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
    getAllWeapons,
    getWeaponById,
    getWeaponByName,
    insertWeapon,
    putWeaponById,
    deleteWeaponById,
    uploadWeapon
}