const Language = require('../models/language')

const getAllLanguages = async (req, res) => {
    const languages = await Language.findAll({
    })
    res.status(200).send(languages)
}
const getLanguageById = async (req, res) => {
    const language = await Language.findByPk(req.params.id, {
    })
    language ? res.status(200).send(language) : res.status(404).json({ success: false, message: 'Language not found.' })
}
const getLanguageByName = async (req, res) => {
    if (!req.language) return res.status(401).json({ success: false, message: 'Invalid language to access it.' })
    const language = await Language.findOne({
        where: { languagename: req.params.languagename },
    })
    language ? res.status(200).send(language) : res.status(404).json({ success: false, message: 'Language not found.' })
}
const insertLanguage = async (req, res) => {
    await Language.create({
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
const putLanguageById = async (req, res) => {
    if (!req.language) return res.status(401).json({ success: false, message: 'Invalid language to access it.' })
    await Language.update(req.body, { where: { id: req.params.id } })
        .then((language) => { language[0] === 1 ? res.sendStatus(200) : res.status(404).json({ success: false, message: 'Language not found.' }) })
}
const deleteLanguageById = async (req, res) => {
    if (!req.language) return res.status(401).json({ success: false, message: 'Invalid language to access it.' })
    await Language.destroy({ where: { id: req.params.id } })
        .then((language) => { language ? res.status(200).send('Language was deleted!') : res.status(404).json({ success: false, message: 'Language not found.' }) })
}

module.exports = {
    getAllLanguages,
    getLanguageById,
    getLanguageByName,
    insertLanguage,
    putLanguageById,
    deleteLanguageById,
}