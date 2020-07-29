// *********************************************************************************
// testHTMLRoutes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads testProj2.html
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/testProj2.html"));
    });

    // videogamereviews route loads videoGameReviews.html
    app.get("/cms", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/cms.html"));
    });

    // moviereviews route loads movieReviews.html
    app.get("/testProj2", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/testProj2.html"));
    });

};
