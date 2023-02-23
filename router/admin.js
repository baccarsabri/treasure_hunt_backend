const express = require("express");

const adminController = require("../controller/admin");

const router = express.Router();


router.get(`getuser/:id`,  adminController.getUser);
router.post(`/username`,  adminController.userbyemail);

router.post(`/login`, adminController.loginAdmin);
router.post(`/add`, adminController.addAdmin);
router.put(`/edit`, adminController.editAdmin);



module.exports = router;
