const organizationController = require('../controllers/organizationController.js')
const router = require('express').Router()

router.post('/', organizationController.insertOrganization)

router.get('/', organizationController.getAllOrganizations)

router.get('/name/:name', organizationController.getOrganizationByName)

router.get('/:id', organizationController.getOrganizationById)

router.put('/:id', organizationController.putOrganizationById)

router.delete('/:id', organizationController.deleteOrganizationById)

module.exports = router