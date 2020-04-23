//! dependencies
const express = require("express");
const router = express.Router();

//! Import the model 
const burgers = require("../models/burger.js");

//! set up routes
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
router.post("/api/burger", function (req, res) {
    // pass new entry details to the db
    burgers.insertOne("burger_name", req.body.name, function (result) {
        // Send back the ID of the new entry
        res.json({
            id: result.insertId
        });
    });
});

// update the status of an existing db entry
router.put("/api/burger/:id", function (req, res) {
    // grab the entry's id
    let entry = "id = " + req.params.id;
    console.log("id: ", id);

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

// Export routes for server.js to use.
module.exports = router;