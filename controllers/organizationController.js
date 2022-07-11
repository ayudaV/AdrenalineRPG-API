const Organization = require('../models/organization')

const getAllOrganizations = async (req, res) => {
    const organizations = await Organization.findAll({
    })
    res.status(200).send(organizations)
}
const getOrganizationById = async (req, res) => {
    const organization = await Organization.findByPk(req.params.id, {
    })
    organization ? res.status(200).send(organization) : res.status(404).json({ success: false, message: 'Organization not found.' })
}
const getOrganizationByName = async (req, res) => {
    if (!req.organization) return res.status(401).json({ success: false, message: 'Invalid organization to access it.' })
    const organization = await Organization.findOne({
        where: { organizationname: req.params.organizationname },
    })
    organization ? res.status(200).send(organization) : res.status(404).json({ success: false, message: 'Organization not found.' })
}
const insertOrganization = async (req, res) => {
    await Organization.create({
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
const putOrganizationById = async (req, res) => {
    if (!req.organization) return res.status(401).json({ success: false, message: 'Invalid organization to access it.' })
    await Organization.update(req.body, { where: { id: req.params.id } })
        .then((organization) => { organization[0] === 1 ? res.sendStatus(200) : res.status(404).json({ success: false, message: 'Organization not found.' }) })
}
const deleteOrganizationById = async (req, res) => {
    if (!req.organization) return res.status(401).json({ success: false, message: 'Invalid organization to access it.' })
    await Organization.destroy({ where: { id: req.params.id } })
        .then((organization) => { organization ? res.status(200).send('Organization was deleted!') : res.status(404).json({ success: false, message: 'Organization not found.' }) })
}

module.exports = {
    getAllOrganizations,
    getOrganizationById,
    getOrganizationByName,
    insertOrganization,
    putOrganizationById,
    deleteOrganizationById,
}