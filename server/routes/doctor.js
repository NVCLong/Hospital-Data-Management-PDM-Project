const express = require("express");
const route = express.Router();
const doctorControler = require("../app/Controller/DoctorController");
const middleWareController = require("../app/Controller/MiddlewareController");

route.get("/patient_list", doctorControler.getAllPatients);

module.exports = route;
