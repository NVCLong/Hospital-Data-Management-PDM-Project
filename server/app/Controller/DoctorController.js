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
        const dId= req.cookies.dId;
        // const doctorDeptid= req.cookies.doctor_deptid;  // đăng nhập lưu cái deptid của doctor vào cookies rồi lấy ra để check
        try {
            await db.query(`SELECT *  FROM inchargeof  WHERE dId=${dId}`,(err, result) => {
                if (err) { throw err; }
                res.render('doctor/patient_list',{patients: SQLToObject(result)})
            });
        } catch (error) {
            console.log(error);
        }
    }

    //[GET] /doctor/ getAllAppointments
    async getAllAppointment(req, res){
        try {
            const dId=req.cookies.dId;
            await db.query(`SELECT name, date, time FROM appointments JOIN patients ON patients.pId=appointments.pId WHERE dId=${dId}`,(err,result)=>{
                res.render("doctor/appointmentList",{appointment: multipleSQLToObject(result)});
            } );
        }catch (error) {
            console.log(error);
        }
    }

    //[GET] /doctor/inChargeForm/:id
    async  inChargeForm(req, result) {
        try {
            const d_ID= req.cookies.d_ID
          await  db.query(`SELECT name,age,pId FROM patients WHERE patients.pId= ${req.params.id}`, (err, res) => {
                result.status(200).render('doctor/inChargeForm', {patient: SQLToObject(res), d_ID: d_ID});
            })
        }catch (e) {
            console.log(e);
        }
    }

    //[POST] /doctor/inChargeForm/:id
    async inChargeFormPost(req, res) {
        const newCharge={
            pId:req.body.pId,
            dId: req.cookies.dId,
            pName: req.body.pName,
            details: req.body.details,
            startDate: req.body.startDate
        }
        try {
            await db.query(`INSERT INTO inchargeof SET ? `,newCharge, (err, res)=>{

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

    //[PATCH]  /doctor/updateInchargeDetails/:id
    async updateForm(req,res){
        try{
            await db.query(`SELECT details FROM inchargef WHERE inchargeof.pId= ${req.params.id}`, (err, res)=>{
                if(err){
                    console.log(err)
                    throw err;
                }
                res.render("doctor/updateInchargeDetails",{details:SQLToObject(res)})
            })
        }catch (e) {
            console.log(e);
        }
    }
    //[PATCH] /doctor/updateForm/:id
    async updateDetail(req,res){
        try{
            const details = req.body.details
            await db.query(`Update inchargeof SET inchargeof.details=${details} WHERE inchargeof.pId=${req.params.id} , inchargeof.dId=${req.cookies.dId}`,(err, res)=>{
                if (err){
                    console.log(err)
                    throw err
                }
                res.redirect('')
            })
        }catch (e) {
            console.log(e)
        }
    }
}
module.exports = new DoctorController();
