//Noting packages
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

//middleware for parsing/json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Use require to get all routes API/HTML combined
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

//starting server
app.listen(PORT, function() {
  console.log(`API server now on port ${PORT}!`);
});