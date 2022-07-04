const userController = require('../controllers/userController.js')
const router = require('express').Router()

router.post('/', userController.upload , userController.postUser)

router.get('/', userController.getAllUsers)

router.get('/username/:username', userController.getUserByNick)

router.get('/:id', userController.getUserById)

router.put('/:id', userController.putUserById)

router.delete('/:id', userController.deleteUserById)

module.exports = router