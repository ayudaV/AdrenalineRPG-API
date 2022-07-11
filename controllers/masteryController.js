const Mastery = require('../models/mastery')

const getAllMasterys = async (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    const masterys = await Mastery.findAll({
    })
    res.status(200).send(masterys)
}
const getMasteryById = async (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    const mastery = await Mastery.findByPk(req.params.id, {
    })
    mastery ? res.status(200).send(mastery) : res.status(404).json({ success: false, message: 'Mastery not found.' })
}
const getMasteryByName = async (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    if (!req.mastery) return res.status(401).json({ success: false, message: 'Invalid mastery to access it.' })
    const mastery = await Mastery.findOne({
        where: { name: req.params.name },
    })
    mastery ? res.status(200).send(mastery) : res.status(404).json({ success: false, message: 'Mastery not found.' })
}
const insertMastery = async (req, res) => {
    if (!req.user || (req.user.role != "Admin" && req.user.role != "Master")) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    await Mastery.create({
        name: req.body.name,
        description: req.body.description,
        damage: req.body.damage,
        health: req.body.health,
        armor: req.body.armor,
        strength: req.body.strength,
        dexterity: req.body.dexterity,
        constitution: req.body.constitution,
        intelligence: req.body.intelligence,
        wisdom: req.body.wisdom,
        charisma: req.body.charisma,
        idType: req.body.idType,
    })
        .then(function () {
            res.sendStatus(201);
        })
        .catch(function () {
            res.sendStatus(406);
        });
}
const putMasteryById = async (req, res) => {
    if (!req.user || (req.user.role != "Admin" && req.user.role != "Master")) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    await Mastery.update(req.body, { where: { id: req.params.id } })
        .then((mastery) => { mastery[0] === 1 ? res.sendStatus(200) : res.status(404).json({ success: false, message: 'Mastery not found.' }) })
}
const deleteMasteryById = async (req, res) => {
    if (!req.user || (req.user.role != "Admin" && req.user.role != "Master")) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    await Mastery.destroy({ where: { id: req.params.id } })
        .then((mastery) => { mastery ? res.status(200).send('Mastery was deleted!') : res.status(404).json({ success: false, message: 'Mastery not found.' }) })
}

module.exports = {
    getAllMasterys,
    getMasteryById,
    getMasteryByName,
    insertMastery,
    putMasteryById,
    deleteMasteryById,
}