const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const userController = require("../controllers/users");

router.post("/signUp", userController.signUp_new_user);

router.post("/login", userController.login_user);

router.delete('/:userId', checkAuth, userController.delete_user);

module.exports = router;