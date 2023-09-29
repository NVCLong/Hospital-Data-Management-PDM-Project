const express = require('express')
const router= express.Router()
const authenticationController= require('../app/Controller/authenticationController')


router.get('/',authenticationController.loginForm)



module.exports = router;