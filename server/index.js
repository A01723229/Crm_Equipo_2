const express = require("express");
const cors = require("cors");
const { serverPort } = require("./constants");
const apiRoutes = require("./route");

const app = express();
app.use(cors());
app.use(express.json());

app.use(apiRoutes);

app.listen(serverPort, () => {
  console.log(`Server running on port ${serverPort}`);
});
