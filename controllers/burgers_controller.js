//! dependencies
const express = require("express");
const router = express.Router();

//! model 
const burgers = require("../models/burger.js");

//! routes
// site root page
router.get("/", function (req, res) {
    // pass in all db entries
    burgers.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        // display the index view and pass in the handlebar object
        res.render("index", hbsObject);
    });
});

// add a new db entry
router.post("/api/burgers", function (req, res) {
    // pass new entry details to the db
    burgers.insertOne(["burger_name", "devoured"], [req.body.name, req.body.devoured],
        function (result) {
            // Send back the ID of the new entry
            res.json({
                id: result.insertId
            });
        }
    );
});

// update the status of an existing db entry
router.put("/api/burgers/:id", function (req, res) {
    // grab the entry's id
    var entry = "id = " + req.params.id;
    console.log("id: ", entry);

    // update the entry "devoured" status
    burgers.updateOne({
            devoured: req.body.devoured
        },
        entry,
        function (result) {
            if (result.changedRows === 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

// Export routes
module.exports = router;