const characterController = require('../controllers/characterController.js')
const router = require('express').Router()

router.post('/',characterController.uploadCharacter, characterController.insertCharacter)

router.get('/', characterController.getAllCharacters)

router.get('/name/:name', characterController.getCharacterByName)

router.get('/:id', characterController.getCharacterById)

router.put('/:id', characterController.putCharacterById)

router.put('/image/:id',characterController.uploadCharacter, characterController.updateImageById)

router.delete('/:id', characterController.deleteCharacterById)

module.exports = router