const express = require("express");
const app = express();
const port = 7000;
const routes = require("../server/routes/index");
const { normalizeType } = require("express/lib/utils");
const morgan = require("morgan");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded());

// apply the cookie parser that we can interact with client cookies
app.use(cookieParser());
//morgan
app.use(morgan("combined"));
//routers
routes(app);

const db = (connect = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    port: 3306,
    database: "test",
}));
db.connect((error) => {
    if (error) {
        console.log(error);
    }
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
