const Weapon = require('../models/weapon')
const multer = require('multer')
const path = require('path')

const getAllWeapons = async (req, res) => {
    const weapons = await Weapon.findAll()
    res.status(200).send(weapons)
}
const getWeaponById = async (req, res) => {
    const weapon = await Weapon.findByPk(req.params.id, {
    })
    res.status(200).send(weapon)
}
const getWeaponByName = async (req, res) => {
    const weapon = await Weapon.findOne({
        where: { name: req.params.name },
    })
    res.status(200).send(weapon)
}
const insertWeapon = async (req, res) => {
    await Weapon.create({
        name: req.body.name,
        description: req.body.description,
        image: req.file.path,
        damage: req.body.damage,
        bonus: req.body.bonus
    }).then(function () {
        res.sendStatus(201)
    }).catch(function () {
        res.sendStatus(406)
    })
}
const putWeaponById = async (req, res) => {
    const weapon = await Weapon.update(req.body, { where: { id: req.params.id } })
    res.status(200).send(weapon)
}
const deleteWeaponById = async (req, res) => {
    await Product.destroy({ where: { id: req.params.id } })
    res.status(200).send('Weapon was deleted!')
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images/Weapons')
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
    getAllWeapons,
    getWeaponById,
    getWeaponByName,
    insertWeapon,
    putWeaponById,
    deleteWeaponById,
    upload
}