const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const { RANDOM } = require("mysql/lib/PoolSelector");
const db = (connect = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    port: 3306,
    database: "test",
}));

class UserController {
    static id = 0;

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

    //[POST] /authentication/doctor/submit
    async loginDoctorSubmit(req, res) {
        let username = req.body.name;
        let password = req.body.password;
        try {
            let user;
            db.query(
                `select * from doctors where name = '${username}'`,
                async (err, result) => {
                    user = result[0];
                    if (!user) {
                        res.status(404).json("error");
                    }
                    const validPassword = await bcrypt.compare(password, user.password);
                    if (!validPassword) {
                        res.status(200).json("Different password");
                    } else if (validPassword && user) {
                        const accessToken = jwt.sign(
                            {
                                username: user.name,
                                password: user.password,
                            },
                            "secret",
                            { expiresIn: "20s" }
                        ); // store in redux
                        const refreshToken = jwt.sign(
                            {
                                username: user.name,
                                password: user.password,
                            },
                            "secret",
                            { expiresIn: 60 * 60 }
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
                        res.cookie("d_ID",user.doctor_ID,{
                            httpOnly: true,
                            secure: true
                        })
                        res.status(200).json({ username: username });
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
        let username = req.body.name;
        let password = req.body.password;
        try {
            let user;
            db.query(
                `select * from user where name = '${username}'`,
                async (err, result) => {
                    user = result[0];
                    if (!user) {
                        res.status(404).json("error");
                    }
                    const validPassword = await bcrypt.compare(password, user.password);
                    if (!validPassword) {
                        res.status(200).json("Different password");
                    } else if (validPassword && user) {
                        const accessToken = jwt.sign(
                            {
                                username: user.name,
                                password: user.password,
                            },
                            "secret",
                            { expiresIn: "20s" }
                        ); // store in redux
                        const refreshToken = jwt.sign(
                            {
                                username: user.name,
                                password: user.password,
                            },
                            "secret",
                            { expiresIn: 60 * 60 }
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
                        res.status(200).json({ username: username });
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
                id: UserController.id,
                name: req.body.name,
                age: req.body.age,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                insuranceNumber: req.body.insuranceNumber,
                password: hashPassword,
                role: "patient", // form đăng ký auto là bệnh nhân , bác sĩ sẽ được cấp acc
            };
            const querry = db.query(
                "INSERT INTO user SET ?",
                user,
                function (error, results, fields) {
                    if (error) throw error;
                    // Neat!
                }
            );
            UserController.id++;
            res.json({ msg: "success" });
            console.log(querry.sql);
        } catch (e) {
            console.log(e);
        }
    }
    generateAccessToken(user) {
        return jwt.sign(
            {
                username: user.username,
                password: user.password,
            },
            "secret",
            { expiresIn: 60 }
        );
    }
    generateRefreshToken(user) {
        return jwt.sign(
            {
                username: user.username,
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

    logout(req, res) {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.redirect("/");
    }
}
module.exports = new UserController();
