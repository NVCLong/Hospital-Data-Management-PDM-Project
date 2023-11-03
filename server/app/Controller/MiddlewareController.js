const userController= require('../Controller/UserController')
const jwt= require('jsonwebtoken')


// verify token as a middleware

// wait until with

class MiddlewareController{
    verifyRefreshToken(req,res){
        const token = req.cookies.refreshToken;
        if(token){
            jwt.verify(token,'secret',(err)=>{
                if(err){
                    res.redirect('authentication')
                }
                userController.requestRefreshToken(req,res).then(
                    function () {
                        console.log("Successfully")
                    }
                ).catch(function (err) {
                    console.log(err)
                })
            })
        }else{
            res.redirect('/authentication')
        }
    }


    // get token in redux session
    verifyAccessToken(req, res){

    }


}