// *********************************************************************************
// testAPIRoutes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
// Requiring our Todo model
var db = require("./models");

// Routes
// =============================================================

module.exports = function(app) {

    // GET route for getting all of the reviews
    app.get("/api/reviews/", function(req, res) {
        db.Reviews.findAll({})
            .then(function(dbReviews) {
                res.json(dbReviews);
            });
    });

    // GET route for returning reviews of a specific category or genre, video game or movie
    app.get("/api/reviews/category/:category", function(req, res) {
        db.Reviews.findAll({
            where: {
                category: req.params.category
            }
        })
        .then(function(dbReviews) {
            res.json(dbReviews);
        });
    });

    // GET route for retrieving a single review
    app.get("/api/reviews/:id", function(req, res) {
        db.Reviews.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(function(dbReviews) {
                res.json(dbReviews);
            });
    });

    // POST route for saving a new review
    app.post("/api/reviews", function(req, res) {
        console.log(req.body);
        db.Reviews.create({
            title: req.body.title,
            review: req.body.review,
            category: req.body.category
        })
        .then(function(dbReviews) {
            res.json(dbReviews);
        });
    });

    // DELETE route for deleting reviews
    app.delete("/api/reviews/:id", function(req, res) {
        db.Reviews.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function(dbReviews) {
            res.json(dbReviews);
        });
    });

    // PUT route for updating reviews
    app.put("/api/reviews", function(req, res) {
        db.Reviews.update(req.body,
            {
                where: {
                    id: req.body.id
                }
            })
            .then(function(dbReviews) {
                res.json(dbReviews);
            });
    });

};