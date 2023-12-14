const mysql = require("mysql");
const { multipleSQLToObject, SQLToObject } = require("../../untils/Sql");
const db = (connect = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password123",
    port: 3306,
    database: "test",
}));

class PatientController {
    // [GET] /patient/appointments
    async getPatientAppointments(req, res) {
        const patientId = req.cookies.p_ID;
        try {
            // retrive data from database
            await db.query(
                `SELECT * FROM appointments WHERE pId=${patientId}`,
                (err, result) => {
                    if (err) throw err;
                }
            );
            res.render("patient/appointments", {
                appointments: multipleSQLToObject(result),
            });
        } catch (error) {
            console.log(error);
        }
    }

    // [GET] /patient/newAppointment:id
    async showNewAppointmentForm(req, res) {
        try {
            const patientID = req.cookies.p_ID;
            const doctors = await this.getAvailableDoctors();
            res.render("patient/newAppointment", { patientID, doctors });
        } catch (error) {
            console.log(error);
        }
    }

    // [POST] /patient/newAppointment:id
    async createNewAppointmentPost(req, res) {
        const newAppointment = {
            dId: req.body.dId,
            pId: req.cookies.p_ID,
            date: req.body.date,
            time: req.body.time,
        };
        try {
            await db.query(
                `INSERT INTO appointments SET ?`,
                newAppointment,
                (err, result) => {
                    if (err) throw err;
                    res.redirect("/patient/appointments");
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    // Fetch a vailable doctors
    async getAvailableDoctors() {
        try {
            const d_ID = req.cookies.d_ID;
            const doctors = await db.query(
                `SELECT * FROM user WHERE role = 'doctor' AND id NOT IN (SELECT dId=${d_ID} FROM appointments)`
            );
            return doctors;
        } catch (error) {
            console.log(error);
        }
    }
    // [GET] /patitent/details/:id
    async getPatientDetails(req, res) {
        const patientId = req.params.id;
        try {
            await db.query(
                `SELECT * FROM user WHERE role = 'patient' AND id=${patientId}`,
                (err, result) => {
                    if (err) {
                        throw err;
                    }
                    res.render("patient/details", { patients: result });
                }
            );
        } catch (error) {
            console.log(error);
        }
    }
    // GET /patient/edit/:id
    async editPatientForm(req, res) {
        try {
            const patientId = req.params.id;
            await db.query(
                `SELECT * FROM user WHERE role = 'patient' AND id=${patientId}`,
                (err, result) => {
                    if (err) throw err;

                    const patient = SQLToObject(result);
                    res.render("patient/editInfo", { user: patient });
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    // POST /patient/edit/:id
    async editPatientInfo(req, res) {
        const { name, age, address, phoneNumber, insuranceNumber, password } =
            req.body;
        const patientId = req.params.id;

        try {
            await db.query(
                "UPDATE user SET name = ?, age = ?, address = ?, phoneNumber = ?, insuranceNumber = ?, password = ? WHERE id = ?",
                [name, age, address, phoneNumber, insuranceNumber, password, patientId],
                (err, result) => {
                    if (err) throw err;
                    res.redirect("/patient/details/" + patientId);
                }
            );
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = new PatientController();
