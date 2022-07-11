const masteryController = require('../controllers/masteryController.js')
const router = require('express').Router()

router.post('/', masteryController.insertMastery)

router.get('/', masteryController.getAllMasterys)

router.get('/name/:name', masteryController.getMasteryByName)

router.get('/:id', masteryController.getMasteryById)

router.put('/:id', masteryController.putMasteryById)

router.delete('/:id', masteryController.deleteMasteryById)

module.exports = router