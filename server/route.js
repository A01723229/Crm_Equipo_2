const express = require("express");
const { getData } = require("./RestControllers/getData.js");
const { postLogin } = require("./RestControllers/postLogin.js");
const { postSignup } = require("./RestControllers/postSignup.js");
const { getMe } = require("./RestControllers/getMe");
const getGemini = require("./RestControllers/getGemini");
const authMiddleware = require("./middleware/auth");
const router = express.Router();

router.get("/data", getData);
router.post("/login", postLogin);
router.post("/signup", postSignup);
router.get("/me", authMiddleware, getMe);
router.post("/gemini", getGemini);

module.exports = router;
