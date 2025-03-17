const express = require("express");
const { getDashboard } = require("./RestControllers/getDashboard.js");
const router = express.Router();

router.get("/dashboard", getDashboard);

module.exports = router;
