const authenticationRoute= require('./authentication')

module.exports = function route(app){
    app.use('/authentication',authenticationRoute)
}
