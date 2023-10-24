const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
class UserController {
    //[GET] /authenication/
    refreshTokenList=[];
    async loginForm(req,res){c
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
        try{
            const user= await User.find({username:username});
            if(!user){
                res.status(404).json("error")
            }


            // Verify Password
            const validPassword = await bcrypt.compare(
                password,
                user.password
            );
            if(!validPassword){
                res.status(200).json("Different password")
            }else if(validPassword && user){
                const accessToken=this.generateAccessToken(user)  // store in redux
                const refreshToken =this.generateRefreshToken(user) // store in httpOnly Cookies
                res.cookie('refreshToken', refreshToken,{
                    httpOnly: true,
                    secure:true
                })
            }
        }catch (e) {
            console.log(e)
        }
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
    generateAccessToken(user){
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            'secret',
            {expiresIn: 60 * 60},
        )
    }
    generateRefreshToken(user) {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            }
        );
    }

    // Redis
    async requestRefreshToken(req, res) {
        const user = await User.find({username: req.cookies.username})
        try {
            const refreshToken = await req.cookies.refreshToken;
            if (!refreshToken) console.log("Refresh token is invalid");
            if (this.refreshTokenList.includes(refreshToken)===false) console.log("Refresh token is invalid")
            jwt.verify( refreshToken,'secret',(err, user)=>{
                let refreshTokens= this.refreshTokenList.filter((Token)=>{ if (token!== refreshToken) return token})
                if(err) console.log(err);
                const accessToken= this.generateAccessToken(user)
                const newRefreshToken= this.generateRefreshToken(user)
                this.refreshTokenList.push(newRefreshToken)
                res.cookie('refreshToken', newRefreshToken,{
                    httpOnly: true,
                    secure:true,
                    path: '/',
                    sameSite: "strict"
                })

                res.status(200).send({accessToken:accessToken})
            })
        }catch (e) {
            console.log(e)
        }
    }
}
module.exports = new UserController;
