//calling packages
const fs = require("fs");
const router = require('express').Router();
const path = require('path');



//application to read the .json file used to store/retrieve notes
router.get('/api/notes', (req, res) => {
  let noteDB = require('./db/db.json');
  res.json(notesDB);
})

//File encoding UTF-8 to ignore buffer data
router.get('/api/notes', (req, res) => {
  req.body.id = noteDB();
})

fs.readFile('./api/notes', 'UFT-8', (err, data) =>{
  if(err) throw err;
  let notesDB = JSON.parse(data);
});

// //find note by id
// router.get('/api/notes/:id', (req, res) => {
//   let notesDB = findById(req.params.id, noteID);
//   res.json(notes[req.params.id]);
//   });

//

  // router.get('/api/notes', (req, res) => {
//    }
//   res.json(results);
// });

// router.delete("/api/notes/:id", (req, res) => {
//   res.json(notes[req.params.id]);
// });

//use the below - like zookeeper
// const getNotes = () =>
//   fetch('/api/notes', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

// const saveNote = (note) =>
//   fetch('/api/notes', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(note),
//   });

// const deleteNote = (id) =>
//   fetch(`/api/notes/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });



module.exports = router;
