var express = require('express');
var router = express.Router();

const btcs = require("../controllers/btcController");


// Create a new Tutorial
router.post("/", btcs.create);

// Retrieve all btcs
router.get("/", btcs.findAll);

// Retrieve all published btcs
// router.get("/published", btcs.findAllPublished);

// Retrieve a single Tutorial with id
// router.get("/:id", btcs.findOne);

// Update a Tutorial with id
// router.put("/:id", btcs.update);

// Delete a Tutorial with id
// router.delete("/:id", btcs.delete);

// Create a new Tutorial
// router.delete("/", btcs.deleteAll);


module.exports = router;
