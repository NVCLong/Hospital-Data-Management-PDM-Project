const express= require('express');
const route= express.Router();
const siteController= require('../app/Controller/SiteController')

route.get('/',siteController.homepage);


module.exports= route;