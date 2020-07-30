// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Hooking up project with JawsDB
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Bjbootcamp1!',
    database: 'reviewApp'
});
};


// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

// Configuring Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars", "html");

// Handlebars Routing get
app.get("/", function(req, res) {
    res.render("homepage");
});

app.get("/era", function(req, res) {
    res.render("era");
});

app.get("/cms", function(req, res) {
  res.render("cms");
});

// Routes
// =============================================================
require("./routes/testAPIRoutes.js")(app);
require("./routes/testHTMLRoutes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("Listening on port %S", PORT);
    });
});