const raceController = require('../controllers/raceController.js')
const router = require('express').Router()

router.post('/', raceController.insertRace)

router.get('/', raceController.getAllRaces)

router.get('/name/:name', raceController.getRaceByName)

router.get('/:id', raceController.getRaceById)

router.put('/:id', raceController.putRaceById)

router.delete('/:id', raceController.deleteRaceById)

module.exports = router