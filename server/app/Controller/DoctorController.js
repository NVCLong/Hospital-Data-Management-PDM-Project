const mysql = require("mysql");
const sqlObject= require("../../untils/Sql")
const {multipleSQLToObject} = require("../../untils/Sql");
const db = (connect = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    port: 3306,
    database: "test",
}));
class DoctorController {
    //[GET] /promote/patient_list
    async getAllPatients(req, res) {
        const d_ID= req.cookies.d_ID;
        // const doctorDeptid= req.cookies.doctor_deptid;  // đăng nhập lưu cái deptid của doctor vào cookies rồi lấy ra để check
        try {
            const patients = await db.query(
                `SELECT name, id, phoneNumber, address  FROM user  JOIN incharge ON incharge.p_ID=user.id  WHERE d_ID=${d_ID}`
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

    // // [POST] /promote/addToInCharge
    // // create an form to add patient information
    // async addToInCharge(req, res) {
    //     try {
    //         const
    //         db.query(`INSERT INTO incharge SET ?`, )
    //
    //
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    //[GET] /doctor/inChargeForm/:id
    inChargeForm(req, res) {
        db.query(`SELECT name,age, insuranceNumber FROM user WHERE user,id= ${req.params.id}`,(err, res) => {
            res.status(200).render('doctor/inChargeForm', {});
        })

    }

}
module.exports = new DoctorController();
