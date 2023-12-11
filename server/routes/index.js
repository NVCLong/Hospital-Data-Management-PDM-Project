const authenticationRoute= require('./authentication')
const siteRoute= require('./site')
const doctor= require('./doctor')

module.exports = function route(app){
    app.use('/authentication',authenticationRoute)
    app.use('/promote',doctor)
    app.use('/',siteRoute);
}
