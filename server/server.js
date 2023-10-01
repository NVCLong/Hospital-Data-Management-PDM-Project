const express = require('express');
const app = express();
const port = 7000;
const routes= require('../server/routes/index');
const {normalizeType} = require("express/lib/utils");
const morgan = require("morgan");



app.use(express.json())
app.use(express.urlencoded());
//morgan
app.use(morgan('combined'))
//routers
routes(app)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
