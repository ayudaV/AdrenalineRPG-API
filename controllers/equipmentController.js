const Equipment = require('../models/equipment')
const multer = require('multer')
const path = require('path')

const getAllEquipments = async (req, res) => {
    const equipments = await Equipment.findAll({
    })
    res.status(200).send(equipments)
}
const getEquipmentById = async (req, res) => {
    const equipment = await Equipment.findByPk(req.params.id, {
    })
    equipment ? res.status(200).send(equipment) : res.status(404).json({ success: false, message: 'Equipment not found.' })
}
const getEquipmentByName = async (req, res) => {
    if (!req.equipment) return res.status(401).json({ success: false, message: 'Invalid equipment to access it.' })
    const equipment = await Equipment.findOne({
        where: { equipmentname: req.params.equipmentname },
    })
    equipment ? res.status(200).send(equipment) : res.status(404).json({ success: false, message: 'Equipment not found.' })
}
const insertEquipment = async (req, res) => {
    await Equipment.create({
        name: req.body.name,
        description: req.body.description,
        weight: req.body.weight,
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
const putEquipmentById = async (req, res) => {
    if (!req.equipment) return res.status(401).json({ success: false, message: 'Invalid equipment to access it.' })
    await Equipment.update(req.body, { where: { id: req.params.id } })
        .then((equipment) => { equipment[0] === 1 ? res.sendStatus(200) : res.status(404).json({ success: false, message: 'Equipment not found.' }) })
}
const deleteEquipmentById = async (req, res) => {
    if (!req.equipment) return res.status(401).json({ success: false, message: 'Invalid equipment to access it.' })
    await Equipment.destroy({ where: { id: req.params.id } })
        .then((equipment) => { equipment ? res.status(200).send('Equipment was deleted!') : res.status(404).json({ success: false, message: 'Equipment not found.' }) })
}

const storageEquipment = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images/Equipments')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
})
const uploadEquipment = multer({
    storage: storageEquipment,
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
    getAllEquipments,
    getEquipmentById,
    getEquipmentByName,
    insertEquipment,
    putEquipmentById,
    deleteEquipmentById,
    uploadEquipment
}