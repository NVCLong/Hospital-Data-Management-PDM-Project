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
        const d_Id= req.cookies.d_ID;
        // const doctorDeptid= req.cookies.doctor_deptid;  // đăng nhập lưu cái deptid của doctor vào cookies rồi lấy ra để check
        try {
            await db.query(`SELECT *  FROM inchargeof WHERE dId=${d_Id}`,(err, result) => {
                if (err) { throw err; }
                console.log(typeof result)
                res.render('doctor/patientlist',{patients: result})
            });
        } catch (error) {
            console.log(error);
        }
    }

    //[GET] /doctor/ getAllAppointments
    async getAllAppointment(req, res){
        try {
            const dId=req.cookies.d_ID;
            await db.query(`SELECT name, date, time FROM appointments JOIN patients ON patients.pId=appointments.pId WHERE dId=${dId}`,(err,result)=>{
                res.render("doctor/appointmentList",{appointment:result});
            } );
        }catch (error) {
            console.log(error);
        }
    }

    //[GET] /doctor/inChargeForm/:id
    async  inChargeForm(req, result) {
        try {
            const d_ID= req.cookies.d_ID
            console.log(typeof req.params.id)
            await  db.query(`SELECT name,pId, phoneNumber FROM patients WHERE patients.pId=${req.params.id}`, (err, res) => {
                if (err) {
                    console.log(err)
                }
                console.log(res);
                result.status(200).render('doctor/inChargeForm', {patient: res, d_ID: d_ID});
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
            res.redirect("/doctor/patientList");
        }catch (e) {
            console.log(e);
        }
    }

    //GET]  /doctor/updateInchargeDetails/:id
    async updateForm(req,res){
        try{
            await db.query(`SELECT details FROM inchargeof WHERE inchargeof.pId= ${req.params.id}`, (err, result)=>{
                if(err){
                    console.log(err)
                    throw err;
                }
                res.render("doctor/updateInchargeDetails",{details:result})
            })
        }catch (e) {
            console.log(e);
        }
    }
    //[PATCH] /doctor/updateForm/:id
    async updateDetail(req,res){
        try{
            const details = req.body.details
            const dId=req.cookies.d_ID;
            await db.query(`Update inchargeof SET inchargeof.details="${details}" WHERE inchargeof.pId=${req.params.id} AND inchargeof.dId=${dId}`,(err, result)=>{
                if (err){
                    console.log(err)
                    throw err
                }
                res.redirect('/doctor/patient_list')
            })
        }catch (e) {
            console.log(e)
        }
    }
}
module.exports = new DoctorController();
