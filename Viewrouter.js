const express = require("express");
const listViewRouter = express.Router();

// Route to list complete tasks
listViewRouter.get("/complete", (req, res) => {
  // Implement logic to list complete tasks
  res.send("List of complete tasks");
});

// Route to list incomplete tasks
listViewRouter.get("/incomplete", (req, res) => {
  // Implement logic to list incomplete tasks
  res.send("List of incomplete tasks");
});

module.exports = listViewRouter;
