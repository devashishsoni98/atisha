const express = require("express");
const { addMasterValue, getMasterValues } = require("../controllers/masterController"); // Import the controller functions

const router = express.Router();

// Define the route for adding a master value
router.post("/:type", addMasterValue);

// Define the route for fetching subjects
router.get("/:type", getMasterValues);

module.exports = router;
