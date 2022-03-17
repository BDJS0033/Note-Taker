const fs = require('fs');
const path = require('path');

module.exports = app => {
    
    // Setup notes variable. UTF8 to remove buffering
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        var notesDB = JSON.parse(data);

        // Creating GET route
        app.get("/api/notes", function(_req, res) {
            //return all saved notes as JSON.
            res.json(notesDB);
        });

        // Creating POST
        app.post("/api/notes", function(req, _res) {
            // Receives a new note, adds it to db.json, then returns the new note
            let newNote = req.body;
            notesDB.push(newNote);
            updateDb();
            return console.log("New Note: "+ newNote.title);
        });

        // Retrieves a note with ID
        app.get("/api/notes/:id", function(req, res) {
            res.json(notesDB[req.params.id]);
        });

        // Deletes a note with specific id
        app.delete("/api/notes/:id", function(req, _res) {
            notesDB.splice(req.params.id, 1);
            updateDb();
            console.log("Delete Note "+req.params.id);
        });

        //Added htmlROUTES to Index.js - Keep All Routes together
       
        // app.get('/', function (req, res) {
        //     res.sendFile(path.join(__dirname, "../../public/index.html"));
        // });

        app.get('/notes', function(_req, res) {
            res.sendFile(path.join(__dirname, "../../public/notes.html"));
        });

        app.get('*', function(_req, res) {
            res.sendFile(path.join(__dirname, "../../public/index.html"));
        });

        //Function to writefile whenever a note is added or deleted
        function updateDb() {
            fs.writeFileSync("./db/db.json", JSON.stringify(notesDB,'\t'), err => {
                if (err) throw err;
                return true;
            });
        }

    });

}