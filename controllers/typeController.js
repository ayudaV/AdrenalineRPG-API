const Type = require('../models/type')

const getAllTypes = async (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    const types = await Type.findAll({
    })
    res.status(200).send(types)
}
const getTypeById = async (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    const type = await Type.findByPk(req.params.id, {
    })
    type ? res.status(200).send(type) : res.status(404).json({ success: false, message: 'Type not found.' })
}
const getTypeByName = async (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    const type = await Type.findOne({
        where: { name: req.params.name },
    })
    type ? res.status(200).send(type) : res.status(404).json({ success: false, message: 'Type not found.' })
}
const insertType = async (req, res) => {
    if (!req.user || req.user.role != "Admin") return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    await Type.create({
        name: req.body.name,
        description: req.body.description,
    })
        .then(function () {
            res.sendStatus(201);
        })
        .catch(function () {
            res.sendStatus(406);
        });
}
const putTypeById = async (req, res) => {
    if (!req.user || req.user.role != "Admin") return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
        await Type.update(req.body, { where: { id: req.params.id } })
        .then((type) => { type[0] === 1 ? res.sendStatus(200) : res.status(404).json({ success: false, message: 'Type not found.' }) })
}
const deleteTypeById = async (req, res) => {
    if (!req.user || req.user.role != "Admin") return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
        await Type.destroy({ where: { id: req.params.id } })
        .then((type) => { type ? res.status(200).send('Type was deleted!') : res.status(404).json({ success: false, message: 'Type not found.' }) })
}

module.exports = {
    getAllTypes,
    getTypeById,
    getTypeByName,
    insertType,
    putTypeById,
    deleteTypeById,
}