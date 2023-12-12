const express = require("express");
const route = express.Router();
const siteController = require("../app/Controller/SiteController");
const userController = require("../app/Controller/UserController");
const middlewareController = require("../app/Controller/MiddlewareController");

route.get(
    "/show",
    siteController.showUser
);
route.get("/", siteController.homepage);

module.exports = route;
