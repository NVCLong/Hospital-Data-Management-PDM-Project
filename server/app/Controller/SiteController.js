class SiteController {
    //[GET]  /
    homepage(req, res) {
        res.render('home');
        // UI will render something depend on frontend and UI (do not have response data)
    }
    dashboard(req, res) {
        res.status(200).render('dashboard');
    }
}

module.exports = new SiteController();
