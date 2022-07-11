const userController = require('../controllers/userController.js')
const router = require('express').Router()

router.post('/',userController.uploadUser, userController.signup)

router.get('/', userController.getAllUsers)

router.get('/username/:username', userController.getUserByNick)

router.get('/:id', userController.getUserById)

router.put('/:id', userController.putUserById)

router.put('/image/:id',userController.uploadUser, userController.updateImageById)

router.put('/role/:id', userController.putUserRoleById)

router.delete('/:id', userController.deleteUserById)

module.exports = router