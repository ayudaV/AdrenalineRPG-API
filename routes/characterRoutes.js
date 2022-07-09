const characterController = require('../controllers/characterController.js')
const router = require('express').Router()

router.post('/',characterController.upload, characterController.insertCharacter)

router.get('/', characterController.getAllCharacters)

router.get('/name/:name', characterController.getCharacterByName)

router.get('/:id', characterController.getCharacterById)

router.put('/:id', characterController.putCharacterById)

router.delete('/:id', characterController.deleteCharacterById)

module.exports = router