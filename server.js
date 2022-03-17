//Noting packages
const fs = require("fs")
const express = require("express");
const path = require("path");

// // //Generates random id - not reading it
// const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;
const app = express();

//middleware for parsing/json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

//Use require to get all routes API/HTML combined
require('./routes/apiRoutes')(app);

//starting server
app.listen(PORT, function() {
  console.log(`API server now on port ${PORT}!`);
});