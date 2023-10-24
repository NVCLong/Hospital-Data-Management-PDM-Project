const authenticationRoute= require('./authentication')
const siteRoute= require('./site')

module.exports = function route(app){
    app.use('/authentication',authenticationRoute)
    app.use('/',siteRoute);
}
