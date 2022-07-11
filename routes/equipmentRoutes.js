const equipmentController = require('../controllers/equipmentController.js')
const router = require('express').Router()

router.post('/',equipmentController.uploadEquipment, equipmentController.insertEquipment)

router.get('/', equipmentController.getAllEquipments)

router.get('/name/:name', equipmentController.getEquipmentByName)

router.get('/:id', equipmentController.getEquipmentById)

router.put('/:id', equipmentController.putEquipmentById)

router.delete('/:id', equipmentController.deleteEquipmentById)

module.exports = router