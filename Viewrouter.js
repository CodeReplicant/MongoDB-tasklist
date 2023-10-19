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

///Middleware to hanlde defectous request 
router.use("/:param", (req, res, next) => {
  const param = req.params.param;

  // Define your validation logic here, for example:
  if (!isValidParam(param)) {
    return res.status(400).send('Invalid parameter');
  }

  next();
});



module.exports = listViewRouter;
