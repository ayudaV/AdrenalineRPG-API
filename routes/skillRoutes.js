const skillController = require('../controllers/skillController.js')
const router = require('express').Router()

router.post('/', skillController.insertSkill)

router.get('/', skillController.getAllSkills)

router.get('/name/:name', skillController.getSkillByName)

router.get('/:id', skillController.getSkillById)

router.put('/:id', skillController.putSkillById)

router.delete('/:id', skillController.deleteSkillById)

module.exports = router