// Dependencies
const fs = require("fs");

//uuid pacakge - finally got it to work!!
const { v4: uuidv4 } = require('uuid');

//Starting export from the start
module.exports = function (app) {

    // API GET Request
    app.get("/api/notes", (request, response) => {
        //getting message for new note - n/to start new line
        console.log("\n\n Notes request");
        //Parse to have information be converted to JSON
        //fs to read file and syncing all the data - utf8 to prevent buffering
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        //catching error
        console.log("\nReturn Notes: " + JSON.stringify(data));
        //Ensuring JSON responds to new data
        response.json(data);
    });

    //Setting up POST Requests
    app.post("/api/notes", (request, response) => {
        //Extracted new note from request body.  
        const newNote = request.body;
        //new line to get a new note POST Request
        console.log("\n\nNew Note : " + JSON.stringify(newNote));

        //Function now responding by assigning unique ids 
        newNote.id = uuidv4();

        //Getting file to read from db.json
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    
        //Pushing new notes to db.json - this took time to work
        data.push(newNote);

        //Continue to write notes db.json
        fs.writeFileSync('./db/db.json', JSON.stringify(data));
        //Success Message
        console.log("\nAdded a new note to 'db.json' file!");
        // Send response
        response.json(data);
    });

    //Bonus API Delete Function - struggled to get this to respond
    app.delete("/api/notes/:id", (request, response) => {
        //getting note by id
        let noteId = request.params.id.toString();
        console.log(`\n\nDelete note with id: ${noteId}`);
        //parsing data to read db.json
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        //added filter to make sure deleted notes are cleared
        const newData = data.filter( note => note.id.toString() !== noteId );
        //Writing new data
        fs.writeFileSync('./db/db.json', JSON.stringify(newData));
        //success message
        console.log(`\nNote deleted with id : ${noteId}`);
        //sending response
        response.json(newData);
    });
};