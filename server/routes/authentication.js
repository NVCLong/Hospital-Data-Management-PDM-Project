const express = require("express");
const router = express.Router();
const userController = require("../app/Controller/UserController");

router.post("/login", userController.loginSubmit);
router.post("/register", userController.register);
router.post("/logout", userController.logout);
router.get("/registerForm", userController.registerForm);
router.get("/doctor/loginForm",userController.loginFormDoctor);
router.get("/doctor/registerForm",userController.registerFormDoctor);
router.post("/doctor/login",userController.loginDoctorSubmit);
router.post("/doctor/register",userController.registerDoctor);
router.get("/", userController.loginForm);

module.exports = router;
