const express = require("express");
const route = express.Router();
const PatientController = require("../app/Controller/PatientController");
const middleWareController = require("../app/Controller/MiddlewareController");

route.get("/patientDetails", PatientController.getPatientDetails);
route.get("/patientEdit", PatientController.editPatientForm);
route.post("/patientEdit/:id", PatientController.editPatientInfo);
route.get("/appointments", PatientController.getPatientAppointments);

module.exports = route;