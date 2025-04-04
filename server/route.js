const express = require("express");
const { getData } = require("./RestControllers/getData.js");
const { postLogin } = require("./RestControllers/postLogin.js");
const { postSignup } = require("./RestControllers/postSignup.js");
const authMiddleware = require("./middleware/auth");
const router = express.Router();

router.get("/data", getData);
router.post("/login", postLogin);
router.post("/signup", postSignup);

router.get("/me", authMiddleware, (req, res) => {
    res.json({
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      company: req.user.company,
    });
  });

module.exports = router;
