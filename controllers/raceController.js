const Race = require('../models/race')

const getAllRaces = async (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    const races = await Race.findAll({
    })
    res.status(200).send(races)
}
const getRaceById = async (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    const race = await Race.findByPk(req.params.id, {
    })
    race ? res.status(200).send(race) : res.status(404).json({ success: false, message: 'Race not found.' })
}
const getRaceByName = async (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    const race = await Race.findOne({
        where: { name: req.params.name },
    })
    race ? res.status(200).send(race) : res.status(404).json({ success: false, message: 'Race not found.' })
}
const insertRace = async (req, res) => {
    if (!req.user || req.user.role != "Admin") return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
    await Race.create({
        name : req.body.name,
        description : req.body.description
    })
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(406))
}
const putRaceById = async (req, res) => {
    if (!req.user || req.user.role != "Admin") return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
        await Race.update(req.body, { where: { id: req.params.id } })
        .then((race) => { race[0] === 1 ? res.sendStatus(200) : res.status(404).json({ success: false, message: 'Race not found.' }) })
}
const deleteRaceById = async (req, res) => {
    if (!req.user || req.user.role != "Admin") return res.status(401).json({ success: false, message: 'Invalid user to access it.' })
        await Race.destroy({ where: { id: req.params.id } })
        .then((race) => { race ? res.status(200).send('Race was deleted!') : res.status(404).json({ success: false, message: 'Race not found.' }) })
}
module.exports = {
    getAllRaces,
    getRaceById,
    getRaceByName,
    insertRace,
    putRaceById,
    deleteRaceById,
}