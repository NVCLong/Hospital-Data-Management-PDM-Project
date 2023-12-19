const mysql = require("mysql");
const { multipleSQLToObject, SQLToObject } = require("../../untils/Sql");
const db = (connect = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    port: 3306,
    database: "test",
}));

class PatientController {
    // [GET] /patient/appointments
    async getPatientAppointments(req, res) {
        const patientId = req.cookies.pId;
        try {
            // retrive data from database
            await db.query(
                `SELECT * FROM appointments WHERE pId=${patientId}`,
                (err, result) => {
                    if (err) {
                        throw err;
                    }
                    console.log(result);
                    res.render("patient/appointments", {
                        appointments: result[0],
                    });
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    // [GET] /patient/newAppointment:id
    async showNewAppointmentForm(req, res) {
        try {
            const patientID = req.cookies.pID;
            res.render("patient/newAppointment", { patientID: patientID });
        } catch (error) {
            console.log(error);
        }
    }

    // // Fetch a vailable doctors
    // async getAvailableDoctors() {
    //     try {
    //         const dId = req.cookies.dId;
    //         const doctors = await db.query(
    //             `SELECT * FROM doctors WHERE dId NOT IN (SELECT dId=${dId} FROM appointments)`
    //         );
    //         return doctors;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // [POST] /patient/newAppointment:id
    async createNewAppointmentPost(req, res) {
        const newAppointment = {
            dId: req.body.dId,
            pId: req.cookies.pId,
            meetDate: req.body.meetDate,
            meetTime: req.body.meetTime,
        };
        try {
            await db.query(
                `INSERT INTO appointments SET ?`,
                newAppointment,
                (err) => {
                    if (err) throw err;
                    res.redirect("/patient/appointments");
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    // [GET] /patitent/details/:id
    async getPatientDetails(req, res) {
        const patientId = req.cookies.pId;
        try {
            await db.query(
                `SELECT * FROM patients WHERE pId= ${patientId}`,
                (err, result) => {
                    if (err) {
                        throw err;
                    }
                    console.log(result);
                    res.render("patient/details", { patients: result[0] });
                }
            );
        } catch (error) {
            console.log(error);
        }
    }
    // GET /patient/edit/:id
    async editPatientForm(req, res) {
        try {
            const patientId = req.cookies.pId;
            await db.query(
                `SELECT * FROM patients WHERE pId=${patientId}`,
                (err, result) => {
                    if (err) throw err;

                    // const patient = SQLToObject(result);
                    res.render("patient/editInfo", { user: result });
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

        // [PATCH] /patient/updateInfo/:id
        async updatePatientInfo(req, res) {
            const patientId = req.params.id;
            const updates = req.body;

            const updateFields = Object.keys(updates);
            const updateValues = Object.values(updates);

            try {
                const updateSetClause = updateFields.map(field => `${field} = ?`).join(', ');

                await db.query(
                    `UPDATE patients SET ${updateSetClause} WHERE pId = ?`,
                    [...updateValues, patientId],
                    (err, result) => {
                        if (err) throw err;
                        res.redirect(`/patientDetails`);
                    }
                );
            } catch (error) {
                console.log(error);
            }
        }
}
module.exports = new PatientController();
