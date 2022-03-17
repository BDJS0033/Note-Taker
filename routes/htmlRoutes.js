//required package
const path = require("path");

// Start Exporting from top again
//Get Requests
module.exports = function (app) {

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    
    app.get('/notes', function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
};