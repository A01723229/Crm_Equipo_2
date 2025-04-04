const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const apiRoutes = require("./route");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use("/api", apiRoutes);

module.exports = app;
