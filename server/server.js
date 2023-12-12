const express = require("express");
const app = express();
const port = 7000;
const routes = require("../server/routes/index");
const { normalizeType } = require("express/lib/utils");
const morgan = require("morgan");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const  expressHandlebars = require("express-handlebars")
const {join} = require("path");

app.use(express.json());
app.use(express.urlencoded());

// static file
app.use(express.static(join(__dirname,'public')));
// apply the cookie parser that we can interact with client cookies
app.use(cookieParser());
//morgan
app.use(morgan("combined"));
//routers
routes(app);

// use template engine
app.engine('handlebars', expressHandlebars.engine(
    {  extname:'hbs'}
    ),
);
app.set('view engine','handlebars')
app.set('views', join(__dirname,'resource','views'));
console.log(__dirname);


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
