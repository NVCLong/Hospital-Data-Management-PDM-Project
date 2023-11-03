const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const mysql = require("mysql");
const {RANDOM} = require("mysql/lib/PoolSelector");
const db=connect = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: 3306,
    database: 'test'
})

class UserController {

    //[GET] /authenication/
    static refreshTokenList=[];
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
        let username= req.body.username;
        let password= req.body.password;
        try{
            let user;
            db.query(`select * from user where name = '${username}'`, async (err, result) => {
                user = result[0];
                if(!user){
                    res.status(404).json("error")
                }
                const validPassword = await bcrypt.compare(
                    password,
                    user.password
                );
                if (!validPassword) {
                    res.status(200).json("Different password")
                } else if (validPassword && user) {
                    const accessToken = jwt.sign(
                        {
                            username: user.name,
                            password: user.password

                        },
                        'secret',
                        {expiresIn: "20s"},
                    )  // store in redux
                    const refreshToken = jwt.sign(
                        {
                            username: user.name,
                            password: user.password

                        },
                        'secret',
                        {expiresIn: 60 * 60},
                    )
                    // store in httpOnly Cookies
                    UserController.refreshTokenList.push(refreshToken)
                    res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: false
                    })
                    res.status(200).json({username: username, accessToken: accessToken})
                }
            });


            // Verify Password

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
            const user={
                id: 1,
                name: req.body.username,
                email: req.body.email,
                password: hashPassword,
            }
           const querry=db.query('INSERT INTO user SET ?', user, function (error, results, fields) {
               if (error) throw error;
               // Neat!
           });
            res.json({msg: "success"})
            console.log(querry.sql);
        }catch (e){
            console.log(e)
        }
    }
    generateAccessToken(user){
        return jwt.sign(
            {
                    username: user.username,
                    password: user.password

            },
            'secret',
            {expiresIn: 60 * 60},
        )
    }
    generateRefreshToken(user) {
        return jwt.sign(
            {
                username: user.username,
                password: user.password
            },
            'secret',
            {expiresIn: '1d'}
        );
    }

    // Redis
    async requestRefreshToken(req, res) {
        const user = await User.find({username: req.cookies.username})

        try {
            const refreshToken = await req.cookies.refreshToken;
            if (!refreshToken) console.log("Refresh token is invalid");
            if (UserController.refreshTokenList.includes(refreshToken)===false) console.log("Refresh token is invalid")
            jwt.verify( refreshToken,'secret',(err, user)=>{
                let refreshTokens= UserController.refreshTokenList.filter((Token)=>{ if (token!== refreshToken) return token})
                if(err) console.log(err);
                const accessToken= this.generateAccessToken(user)
                const newRefreshToken= this.generateRefreshToken(user)
                UserController.refreshTokenList.push(newRefreshToken)
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