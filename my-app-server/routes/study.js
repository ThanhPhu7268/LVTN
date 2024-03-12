const express = require("express")
const router = express.Router()

const studyController = require('../controllers/study')

router.get('/exam/:id', studyController.getExam)
router.get('/:id', studyController.getStudyById)
router.get('/list/:id', studyController.getListStudyByLevelId)


module.exports = router
