

class AuthenticationController{
    //[GET] /authenication
    async loginForm(req,res){
        try{
            res.json({success:true,
            message:"Authentication form"});
        }catch (e) {
            console.log(e);
            res.json({success:false})
        }

    }

}
module.exports = new AuthenticationController;
