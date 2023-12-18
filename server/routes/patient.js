const express = require("express");
const route = express.Router();
const PatientController = require("../app/Controller/PatientController");

route.get("/patientDetails", PatientController.getPatientDetails);
route.get("/patientEdit", PatientController.editPatientForm);
route.patch("/updateInfo/:id", PatientController.updatePatientInfo);
route.get("/appointments", PatientController.getPatientAppointments);
route.get("/newAppointment/:id", PatientController.showNewAppointmentForm);
route.post("/newAppointment/:id", PatientController.createNewAppointmentPost);

module.exports = route;