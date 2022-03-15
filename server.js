//Noting packages
const express = require('express');
const path = require('path');
//Generates random id
const { v4: uuidv4 } = require("uuid");


const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//middleware for parsing/json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Use apiRoutes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//starting server
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});