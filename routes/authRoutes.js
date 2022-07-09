const authController = require('../controllers/authController.js')
const router = require('express').Router()

router.post('/', authController.signin)

module.exports = router