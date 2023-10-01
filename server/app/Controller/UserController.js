const bcrypt = require('bcrypt')

class UserController {
    //[GET] /authenication/
    async loginForm(req,res){
        try{
            res.json({success:true,
            message:"Authentication form"});
        }catch (e) {
            console.log(e);
            res.json({success:false})
        }

    }
    //[POST]  /authentication/login
    async loginSubmit(req, res) {
        const {username, password} = req.body;
        res.send(
            {
        username: username,
        password: password})
        // store user to database
    }
    //[POST]  /authentication/register
    async register(req, res){
        try{
            // hash password to enhance the security of the user account
            // which store in database
            const salt= bcrypt.genSaltSync(10)
            const hashPassword= bcrypt.hashSync(req.body.password, salt)
            res.json({
                username:req.body.username,
                password:hashPassword
            })
        }catch (e){
            console.log(e)
        }
    }



}
module.exports = new UserController;
