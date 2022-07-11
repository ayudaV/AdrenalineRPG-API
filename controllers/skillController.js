const Skill = require('../models/skill')

const getAllSkills = async (req, res) => {
    const skills = await Skill.findAll({
    })
    res.status(200).send(skills)
}
const getSkillById = async (req, res) => {
    const skill = await Skill.findByPk(req.params.id, {
    })
    skill ? res.status(200).send(skill) : res.status(404).json({ success: false, message: 'Skill not found.' })
}
const getSkillByName = async (req, res) => {
    if (!req.skill) return res.status(401).json({ success: false, message: 'Invalid skill to access it.' })
    const skill = await Skill.findOne({
        where: { skillname: req.params.skillname },
    })
    skill ? res.status(200).send(skill) : res.status(404).json({ success: false, message: 'Skill not found.' })
}
const insertSkill = async (req, res) => {
    await Skill.create({
        name: req.body.name,
        description: req.body.description,
        atribute: req.body.atribute,
    })
        .then(function () {
            res.sendStatus(201);
        })
        .catch(function () {
            res.sendStatus(406);
        });
}
const putSkillById = async (req, res) => {
    if (!req.skill) return res.status(401).json({ success: false, message: 'Invalid skill to access it.' })
    await Skill.update(req.body, { where: { id: req.params.id } })
        .then((skill) => { skill[0] === 1 ? res.sendStatus(200) : res.status(404).json({ success: false, message: 'Skill not found.' }) })
}
const deleteSkillById = async (req, res) => {
    if (!req.skill) return res.status(401).json({ success: false, message: 'Invalid skill to access it.' })
    await Skill.destroy({ where: { id: req.params.id } })
        .then((skill) => { skill ? res.status(200).send('Skill was deleted!') : res.status(404).json({ success: false, message: 'Skill not found.' }) })
}

module.exports = {
    getAllSkills,
    getSkillById,
    getSkillByName,
    insertSkill,
    putSkillById,
    deleteSkillById,
}