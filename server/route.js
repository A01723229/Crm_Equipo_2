const constants = require("./constants");
const express = require("express");
const { getDashboard } = require("./RestControllers/getDashboard.js");
const router = express.Router();

router.get(constants.contextURL + constants.api + "/dashboard", getDashboard);

module.exports = router;

