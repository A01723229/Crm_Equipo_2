const express = require("express");
const { getData } = require("../controllers/getData");
const { postLogin } = require("../controllers/postLogin");
const { postSignup } = require("../controllers/postSignup");
const { getMe } = require("../controllers/getMe");
const postGemini = require("../controllers/postGemini");
const authMiddleware = require("../handlers/auth");

const router = express.Router();

router.get("/data", getData);
router.post("/login", postLogin);
router.post("/signup", postSignup);
router.get("/me", authMiddleware, getMe);
router.post("/gemini", postGemini);

module.exports = router;
