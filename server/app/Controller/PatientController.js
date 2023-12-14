const mysql = require("mysql");
const sqlObject = require("../../untils/Sql");
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
    // [GET] /patitent/details/:id
    async getPatientDetails(req, res) {
        const patientId = req.params.id;
        try {
            await db.query(
                `SELECT * FROM user WHERE id=${patientId}`,
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
                `SELECT * FROM user WHERE id=${patientId}`,
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
