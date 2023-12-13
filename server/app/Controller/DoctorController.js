const mysql = require("mysql");
const sqlObject= require("../../untils/Sql")
const {multipleSQLToObject, SQLToObject} = require("../../untils/Sql");
const db = (connect = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    port: 3306,
    database: "test",
}));
class DoctorController {
    //[GET] /doctor/patient_list
    async getAllPatients(req, res) {
        const d_ID= req.cookies.d_ID;
        // const doctorDeptid= req.cookies.doctor_deptid;  // đăng nhập lưu cái deptid của doctor vào cookies rồi lấy ra để check
        try {
            const patients = await db.query(
                `SELECT *  FROM incharge  WHERE d_ID=${d_ID}`
            );

        } catch (error) {
            console.log(error);
        }
    }

    //[GET] /doctor/ getAllAppointment
    async getAllAppointment(req, res){
        try {
            const d_ID=req.cookies.d_ID;
            await db.query(`SELECT name, date, time FROM appointment JOIN user ON user.id=appointment.p_ID WHERE d_ID=${d_ID}`,(err,result)=>{
                res.render("doctor/appointmentList",{appointment: multipleSQLToObject(result)});
            } );
        }catch (error) {
            console.log(error);
        }
    }

    //[GET] /doctor/inChargeForm/:id
    async  inChargeForm(req, res) {
        try {
            const d_ID= req.cookies.d_ID

          await  db.query(`SELECT name,age, insuranceNumber, p_ID FROM user WHERE user,id= ${req.params.id}`, (err, res) => {
                res.status(200).render('doctor/inChargeForm', {patient: SQLToObject(res), d_ID: d_ID});
            })
        }catch (e) {
            console.log(e);
        }
    }

    //[POST] /doctor/inChargeForm/:id
    async inChargeFormPost(req, res) {
        const newCharge={
            name: req.body.name,
            age: req.body.age,
            p_ID: req.body.p_ID,
            d_ID: req.body.d_ID,
            insuranceNumber: req.body.insuranceNumber
        }
        try {
            await db.query(`INSERT INTO incharge SET ? `,newCharge, (err, res)=>{

                 if(err){
                     console.log(err)
                     throw err;
                 }
            })
            res.redirect("/doctor/patient_list");
        }catch (e) {
            console.log(e);
        }

    }

}
module.exports = new DoctorController();
