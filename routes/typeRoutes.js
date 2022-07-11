const typeController = require('../controllers/typeController.js')
const router = require('express').Router()

router.post('/', typeController.insertType)

router.get('/', typeController.getAllTypes)

router.get('/name/:name', typeController.getTypeByName)

router.get('/:id', typeController.getTypeById)

router.put('/:id', typeController.putTypeById)

router.delete('/:id', typeController.deleteTypeById)

module.exports = router