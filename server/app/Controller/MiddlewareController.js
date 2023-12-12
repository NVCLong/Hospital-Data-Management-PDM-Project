const userController = require("../Controller/UserController");
const jwt = require("jsonwebtoken");

// verify token as a middleware

// wait until with

const MiddlewareController = {
    verifyRefreshToken(req, res) {
        const token = req.cookies.refreshToken;
        if (token) {
            jwt.verify(token, "secret", (err) => {
                if (err) {
                    res.redirect("authentication");
                }
                userController
                    .requestRefreshToken(req, res)
                    .then(function () {
                        console.log("Successfully");
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            });
        } else {
            res.redirect("/authentication");
        }
    },

    // get token in redux session
    verifyAccessToken(req, res, next) {
        // store token in redux
        // 20s xóa 1 cái token rồi kiểm tra xem còn refresh hay không, nếu còn sẽ tự động tạo accesstoken mới
        const token = req.cookies.accessToken;
        if (token) {
            jwt.verify(token, "secret", (err, user) => {
                if (err) {
                    res.redirect("authentication");
                }
                req.user = user;
            });
        } else {
            verifyRefreshToken(req, res);
        }
    },
};
module.exports = MiddlewareController;
