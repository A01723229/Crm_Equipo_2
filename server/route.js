const express = require("express");
const { getData } = require("./RestControllers/getData.js");
const { postLogin } = require("./RestControllers/postLogin.js");
const { postSignup } = require("./RestControllers/postSignup.js");
const router = express.Router();

router.get("/data", getData);
router.post("/login", postLogin);
router.post("/signup", postSignup);

module.exports = router;
