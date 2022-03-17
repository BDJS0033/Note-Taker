//fs to write to file
const fs = require("fs");

//required 'uuid' npm package for unique id - finally got it to function
const { v4: uuidv4 } = require("uuid");

//Starting Export
module.exports = function (app) {

    //Creating GET Request
    app.get("/api/notes", (_req, res) => {
        console.log("Getting Note");

        //Parsing to JSON so 'db.json' file gets read
        //utf8 to prevent buffering request
        const data = JSON.parse(fs.readFileSync("../../db/db.json", "utf8"));
        console.log("Note:" + JSON.stringify(data));
        //response of 'GET' request
        res.json(data);
    });

    //POST Request
    app.post("/api/notes", (req, res) => {
        const newNote = req.body;
        console.log("New Note: " + JSON.stringify(newNote));
        //uuid comes into play
        newNote.id = uuidv4();

        //Read data from 'db.json' file
        const data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        //Pushed new note in notes file 'db.json'
        data.push(newNote);

        // Written notes data to 'db.json' file
        fs.writeFileSync("./db/db.json", JSON.stringify(data));

        console.log("New Note Created!");

        // Send response
        res.json(data);
    });


    //Bonus Delete 
    app.delete("/api/notes/:id", (req, res) => {

        // Fetched id to delete
        const  noteId = req.params.id.toString();

        console.log(`Delete noteId: ${noteId}`);

        // Read data from 'db.json' file
        const data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        // filter data to get notes except the one to delete
        const newData = data.filter(note => note.id.toString() !== noteId);

        // Write new data to 'db.json' file
        fs.writeFileSync("./db/db.json", JSON.stringify(newData));

        console.log(`Deleted note with id : ${noteId}`);
        //response
        res.json(newData);
    });
};