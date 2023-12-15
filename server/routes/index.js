const authenticationRoute= require('./authentication')
const siteRoute= require('./site')
const doctor= require('./doctor')
const patientRoute= require('./patient')

module.exports = function route(app){
    app.use('/authentication',authenticationRoute)
    app.use('/doctor',doctor)
    app.use('/patient',patientRoute)
    app.use('/',siteRoute);
}
