const languageController = require('../controllers/languageController.js')
const router = require('express').Router()

router.post('/', languageController.insertLanguage)

router.get('/', languageController.getAllLanguages)

router.get('/name/:name', languageController.getLanguageByName)

router.get('/:id', languageController.getLanguageById)

router.put('/:id', languageController.putLanguageById)

router.delete('/:id', languageController.deleteLanguageById)

module.exports = router