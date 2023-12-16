const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const { RANDOM } = require("mysql/lib/PoolSelector");
const untils= require("../../untils/Sql");
const db = (connect = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    port: 3306,
    database: "test",
}));

class UserController {
    static id = 0;
    static docId =1;

    //[GET] /authenication/
    static refreshTokenList = [];
    async loginForm(req, res) {
        try {
            res.render('authentication/loginForm');
        } catch (e) {
            console.log(e);
            res.json({ success: false });
        }
    }

    //[GET]  /authentication/register
    registerForm(req,res){
        res.render('authentication/registerForm');
    }

    //[GET] authentication/doctor/loginForm
    async loginFormDoctor(req, res) {
        try {
            res.render('authentication/loginDoctor');
        } catch (e) {
            console.log(e);
            res.json({ success: false });
        }
    }

    //[GET]  /authentication/doctor/registerForm
    registerFormDoctor(req,res){
        res.render('authentication/registerDoctor');
    }

    //[GET]] /authentication/doctor/register
    async registerDoctor(req,res){
        try{
            // hash password to enhance the security of the user account
            // which store in database

            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(req.body.password, salt);
            const user = {
                dId: UserController.docId,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                position: req.body.position,
                password: req.body.password,
                deptCode: req.body.deptCode,
            };
            const querry = db.query(
                "INSERT INTO patients SET ?",
                user,
                function (error, results, fields) {
                    if (error) throw error;
                    // Neat!
                }
            );
            UserController.id++;
            res.json({ msg: "success" });

        }catch(e){
            console.log(e)
        }
    }
    //[POST] /authentication/doctor/login
    async loginDoctorSubmit(req, res) {
        let email = req.body.email;
        let password = req.body.password;
        try {
            db.query(
                `select * from doctors where email = '${email}'`,
                async (err, result) => {
                     let doctor = result[0];
                    if (!doctor) {
                        res.status(404).json("error");
                    }
                    const validPassword = await bcrypt.compare(password, doctor.password);
                    if (!validPassword) {
                        res.status(200).json("Different password");
                    } else if (validPassword && doctor) {
                        let accessToken=jwt.sign(
                            {
                                name: doctor.email,
                                password: doctor.password,
                            },
                            "secret",
                            { expiresIn: 60 }
                        );
                        let refreshToken=jwt.sign(
                            {
                                name: doctor.email,
                                password: doctor.password,
                            },
                            "secret",
                            { expiresIn: "1h" }
                        );
                        UserController.refreshTokenList.push(refreshToken);
                        res.cookie("refreshToken", refreshToken, {
                            httpOnly: true,
                            secure: false,
                        });
                        res.cookie("accessToken", accessToken, {
                            httpOnly: true,
                            secure: false,
                        });
                        res.cookie("d_ID",doctor.dId,{
                            httpOnly: true,
                            secure: false
                        })
                        res.status(200).render("home",{doctor: doctor});
                    }
                }
            );

            // Verify Password
        } catch (e) {
            console.log(e);
        }
        // store user to database
    }


    //[POST]  /authentication/login
    async loginSubmit(req, res) {
        let email = req.body.email;
        let password = req.body.password;
        try {

            db.query(
                `select * from patients where email = '${email}'`,
                async (err, result) => {
                    let patient = result[0];
                    console.log(patient)
                    if (!patient) {
                        res.status(404).json("error");
                    }
                    const validPassword = await bcrypt.compare(password, patient.password);
                    if (!validPassword) {
                        res.status(200).json("Different password");
                    } else if (validPassword && patient) {
                        let accessToken=jwt.sign(
                            {
                                email: patient.email,
                                password: patient.password,
                            },
                            "secret",
                            { expiresIn: 60 }
                        );
                        let refreshToken= jwt.sign(
                            {
                                email: patient.email,
                                password: patient.password,
                            },
                            "secret",
                            { expiresIn: "1h" }
                        );
                        // store in httpOnly Cookies
                        UserController.refreshTokenList.push(refreshToken);
                        res.cookie("refreshToken", refreshToken, {
                            httpOnly: true,
                            secure: false,
                        });
                        res.cookie("accessToken", accessToken, {
                            httpOnly: true,
                            secure: false,
                        });
                        res.cookie("pId", patient.pId,{
                            httpOnly: true,
                            secure: false,
                        } )
                        res.render("dashboard",{patient: patient})
                    }
                }
            );

            // Verify Password
        } catch (e) {
            console.log(e);
        }
        // store user to database
    }
    //[POST]  /authentication/register
    async register(req, res) {
        try {
            // hash password to enhance the security of the user account
            // which store in database

            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(req.body.password, salt);
            const user = {
                pId: UserController.id,
                name: req.body.name,
                email: req.body.email,
                password: hashPassword,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                role: "Patient",
            };
            const querry = db.query(
                "INSERT INTO patients SET ?",
                user,
                function (error, results, fields) {
                    if (error) throw error;
                    // Neat!
                }
            );
            UserController.id++;
            res.redirect("/");

        } catch (e) {
            console.log(e);
        }
    }
    generateAccessToken(user) {
        return jwt.sign(
            {
                name: user.email,
                password: user.password,
            },
            "secret",
            { expiresIn: 60 }
        );
    }
    generateRefreshToken(user) {
        return jwt.sign(
            {
                name: user.email,
                password: user.password,
            },
            "secret",
            { expiresIn: "1h" }
        );
    }

    // Redis
    async requestRefreshToken(req, res) {
        try {
            const refreshToken = await req.cookies.refreshToken;
            if (!refreshToken) console.log("Refresh token is invalid");
            if (UserController.refreshTokenList.includes(refreshToken) === false)
                console.log("Refresh token is invalid");
            jwt.verify(refreshToken, "secret", (err, user) => {
                let refreshTokens = UserController.refreshTokenList.filter((Token) => {
                    if (token !== refreshToken) return token;
                });
                if (err) console.log(err);
                const accessToken = this.generateAccessToken(user);
                const newRefreshToken = this.generateRefreshToken(user);
                UserController.refreshTokenList.push(newRefreshToken);
                res.cookie("accessToken", accessToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });
                res.json({ Msg: "Access token" });
            });
        } catch (e) {
            console.log(e);
        }
    }

    //[POST] /authentication/logout
    logout(req, res) {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.redirect("/");
    }
}
module.exports = new UserController();
