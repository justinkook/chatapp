const path = require('path');

module.exports = function(app) {
    //Sends homepage to client
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
    app.get('/login', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/login.html'));
    });
    app.get('/landing', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/landing.html'));
    });
};  
