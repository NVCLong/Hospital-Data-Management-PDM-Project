const mysql = require("mysql");
const sqlObject = require("../../untils/Sql");
const { multipleSQLToObject, SQLToObject } = require("../../untils/Sql");
const db = (connect = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    port: 3306,
    database: "test",
}));

class PatientController {
    async getAllPatients(req, res) {
        try {
            await db.query(`SELECT * FROM patients`, (err, result) => {
                res.render("patient/patient_list", { patients: SQLToObject(result) });
            });
        } catch (error) {
            console.log(error);
        }
    }

    // [GET] /patitent/details/:id
    async getPatientDetails(req, res) {
        try {
            const patientId = req.params.id;
            await db.query(
                `SELECT * FROM user WHERE id=${patientId}`,
                (err, result) => {
                    if (err) {
                        throw err;
                    }

                    const patientData = SQLToObject(result);
                    const patient = new Patient(
                        patientData.id,
                        patientData.name,
                        patientData.age,
                        patientData.insuranceNumber
                    );

                    res.render("patient/patient_details", { user: patient });
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
                    res.render("patient/edit_patient", { user: patient });
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
