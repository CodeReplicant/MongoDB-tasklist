const express = require("express");
const listViewRouter = express.Router();
const fs = require('fs');

const list = JSON.parse(fs.readFileSync('task.json', 'utf8'));//lectura de archivo principal task.json


// Route to list complete tasks
listViewRouter.get("/complete", (req, res) => {
  // Implement logic to list complete tasks 
    // Read tasks from the 'task.json' file
  const formatteddata = list.filter((formatteddata) => formatteddata.isCompleted === true);
  res.status(200).set('Content-Type', 'application/json').send(formatteddata);
  })



// Route to list incomplete tasks
listViewRouter.get("/incomplete", (req, res) => {
  // Implement logic to list incomplete tasks
  const formatteddata = list.filter((formatteddata) => formatteddata.isCompleted === false);
  res.status(200).set('Content-Type', 'application/json').send(formatteddata);
  
});




module.exports = listViewRouter;
