const express = require("express");
const route = express.Router();
const PatientController = require("../app/Controller/DoctorController");
const middleWareController = require("../app/Controller/MiddlewareController");

route.get("/patient_details", PatientController.getPatientDetails);
route.get("/patient_edit", PatientController.editPatientForm);
route.post("/patient_edit/:id",PatientController.editPatientInfo);

module.exports = route;