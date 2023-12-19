const express = require("express");
const route = express.Router();
const PatientController = require("../app/Controller/PatientController");

route.get("/patientDetails", PatientController.getPatientDetails);
route.get("/patientEdit/:id", PatientController.editPatientForm);
route.post("/updateInfo/:id", PatientController.updatePatientInfo);
route.get("/appointments", PatientController.getPatientAppointments);
route.get("/newAppointment", PatientController.showNewAppointmentForm);
route.post("/newAppointment/:id", PatientController.createNewAppointmentPost);

module.exports = route;
