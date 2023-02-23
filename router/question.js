const express = require("express");

const questionController = require("../controller/question");

const router = express.Router();


router.get(`/Questions`,  questionController.Questions);
router.post(`/addQuestion`,  questionController.addQuestion);
router.put(`/edit`,  questionController.editQuestion);
router.get(`/:id`,  questionController.Question);
router.delete(`/delete/:id`,  questionController.deleteQuestion);
router.get(`/all`,  questionController.Questions);

router.get(`/get/:id`, questionController.getQst);







module.exports = router;
