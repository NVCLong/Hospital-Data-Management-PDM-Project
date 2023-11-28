const express= require('express')
const route= express.Router();
const doctorControler= require('../app/Controller/DoctorController')
const middleWareController= require('../app/Controller/MiddlewareController')

route.get('/promote/patient_list',middleWareController.verifyAccessToken,middleWareController.verifyRefreshToken ,doctorControler.getAllPatients)


module.exports= route