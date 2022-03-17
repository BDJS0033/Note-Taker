//required package
const path = require("path");

// Start Exporting from top again
//Get Requests
module.exports = function (app) {
    
    app.get("/notes", function (_req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    app.get("*", function (_req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
};