const weaponController = require('../controllers/weaponController.js')
const router = require('express').Router()

router.post('/',weaponController.uploadWeapon, weaponController.insertWeapon)

router.get('/', weaponController.getAllWeapons)

router.get('/name/:name', weaponController.getWeaponByName)

router.get('/:id', weaponController.getWeaponById)

router.put('/:id', weaponController.putWeaponById)

router.delete('/:id', weaponController.deleteWeaponById)

module.exports = router