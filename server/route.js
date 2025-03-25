const express = require("express");
const { getDashboard } = require("./RestControllers/getDashboard.js");
const { postLogin } = require("./RestControllers/postLogin.js");
const { postSignup } = require("./RestControllers/postSignup.js");
const router = express.Router();

router.get("/dashboard", getDashboard);
router.post("/login", postLogin);
router.post("/signup", postSignup);

module.exports = router;
