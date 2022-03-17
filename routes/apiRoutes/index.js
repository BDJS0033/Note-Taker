//calling packages
const fs = require("fs");
const path = require("path");

// // Generates random id - not reading it
// const { v4: uuidv4 } = require("uuidv4");

//Create exporting function - maintain/manage code
//utf-8 to prevent buffer
module.exports = app => {

    fs.readFile("../../db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        const notesDB = JSON.parse(data);

        //Creating GET & POST route for notesBD
        // creating get and post route for notes input

        app.get("/api/notes", function (req, res) {
            //return as json
            res.json(notesDB);
        });

        //POST request to add new notes
        app.post("/api/notes", function (req, res) {
            let newNote = req.body;
            notesDB.push(newNote);
            updateDb();
            return console.log("Add Note: " + newNote.title);
        });

        //Creating GET & Delete Request for notes
        app.get("/api/notes/:id", function (req, res) {
            res.json(notesDB[req.params.id]);
        });

        app.delete("/api/notes/:id", function (req, res) {
            notesDB.splice(req.params.id, 1);
            updateDb();
            console.log("Note has been deleted, ID: " + req.params.id);
        });

        //Update db.json when notes added and deleted
        function updateDb() {
            fs.writeFile("../../db/db.json", JSON.stringify(notesDB, '\t'), err => {
                if (err) throw err;
                return true;
            });
        }

    })};