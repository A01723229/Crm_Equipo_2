const express = require("express");
const cors = require("cors");
const apiRoutes = require("./route");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

module.exports = app;
