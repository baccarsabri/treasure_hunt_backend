const express = require("express");

const partController = require("../controller/participant");

const router = express.Router();


router.get(`/get/:id`,  partController.getUser);
router.get(`/users`,  partController.getUserSorted);
router.post(`/username`,  partController.getUserByUsername);

router.post("/register", partController.signup);

router.post(`/login`, partController.loginParticipant);
router.put(`/edit`, partController.editUser);

router.post(`/addQ`, partController.addQst);

router.post(`/submitQ`, partController.submitQst);
router.post(`/checkQ`, partController.checkQst);
router.post(`/etat`,  partController.checkEtat);



module.exports = router;
