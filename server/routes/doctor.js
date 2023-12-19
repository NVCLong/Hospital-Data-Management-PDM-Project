const express = require("express");
const route = express.Router();
const doctorControler = require("../app/Controller/DoctorController");
const middleWareController = require("../app/Controller/MiddlewareController");

route.get("/patientlist", doctorControler.getAllPatients);
route.get("/getAllAppointments", doctorControler.getAllAppointment);
route.get("/inchargeForm", doctorControler.inChargeForm);
route.post("/inchargeForm",doctorControler.inChargeFormPost);
route.get("/updateInchargeForm/:id",doctorControler.updateForm)
route.get("/patientlist/:id", doctorControler.patientInformation);
route.patch("/updateInchargeForm/:id",doctorControler.updateDetail)

module.exports = route;
