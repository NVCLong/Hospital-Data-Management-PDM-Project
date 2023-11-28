const mysql = require("mysql");
const db=connect = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: 3306,
    database: 'test'
})
class DoctorController{

    //[GET] /promote/patient_list
    async getAllPatients(req, res){
        const doctorDeptid= req.cookies.doctor_deptid;  // đăng nhập lưu cái deptid của doctor vào cookies rồi lấy ra để check
        try{
            const patients= await db.query(`SELECT name, id, phoneNumber, address  FROM patients JOIN treats ON treats.pid=patients.id WHERE treats.D_id=${doctorDeptid}`)
            res.json({patients: patients});
        }catch(error){
            console.log(error)
        }
    }

    // [POST] /promote/addToInCharge
    async addToInCharge(req, res){
        try{

        }catch (e) {
            console.log(e)
        }
    }

}
module.exports= new DoctorController();