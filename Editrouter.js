const express = require("express");
const listEditRouter = express.Router();
const fs = require('fs');

const list = JSON.parse(fs.readFileSync('task.json', 'utf8'));//lectura de archivo principal task.json




////edicion de lista.///////////////////////////////////////////////////////////////////////////////////////////////////////
// Route to create a task, using a the body of the request   {    "id": 4,    "isCompleted": false,    "descripcion": "Rendir laboralmente en el módulo de comunicaciones"  }


listEditRouter.post("/create", (req, res) => {
  // Implement logic to create a new task
  const newObject = req.body ; // Add the new object to the lis
  list.push(newObject);
  fs.writeFileSync('task.json', JSON.stringify(list, null, 2));
  res.send("Task created successfully");
});

// Route to delete a task, request for example (id->2)  by localhost:3001/delete/2 , 
listEditRouter.delete("/delete/:id", (req, res) => {
    const taskid = parseInt(req.params.id); // Parse the id as an integer
    // Implement logic to delete the task with Id
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === taskid) {
        list.splice(i, 1); // Remove the task from the list
        // Write the updated list to the task.json file with indentation and line breaks
        fs.writeFileSync('task.json', JSON.stringify(list, null, 2));
        return res.send(`Task with ID ${taskid} deleted`);
      }
    }
    // If the task wasn't found, return an error
    res.status(404).send(`Task with ID ${taskid} not found`);
  });


// Route to update a task, request by localhost:3001/update/1 with body request JSON
listEditRouter.put("/update/:id", (req, res) => {
  const taskid = parseInt(req.params.id);
  const newObject = req.body ;
  // Implement logic to update the task with taskId
 
      for (let i = 0; i < list.length; i++) {
          if (list[i].id === taskid) {
              //Update the task properties
              list[i].id = taskid;
              list[i].isCompleted = newObject.isCompleted;
              list[i].descripcion = newObject.descripcion;
              // Write the updated list to the task.json file with indentation and line breaks
              fs.writeFileSync('task.json', JSON.stringify(list, null, 2));
              return res.send(`Task with ID ${taskid} updated`);
          }
      }
// If the task wasn't found, return an error
res.send(`Task with ID ${taskid}  not updated`);
});

////MIDLEWARE////////////////////////////

// Middleware to handle empty request bodies
const handleEmptyBody = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).send('Empty request body');
    }
  }
  next();
};

// Middleware to handle invalid or missing attributes for tasks
const handleInvalidAttributes = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const requiredAttributes = ['id', 'isCompleted', 'description']; // Replace with your required attributes
    const bodyKeys = Object.keys(req.body);
    if (!requiredAttributes.every(attr => bodyKeys.includes(attr))) {
      res.status(400).send('Invalid or missing attributes in the request');
    }
  }
  next();
};

// Apply the middlewares to the router
listEditRouter.use(handleEmptyBody, handleInvalidAttributes);

// Middleware to validate HTTP methods
const validateHttpMethod = (req, res, next) => {
  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) {
    res.status(400).send('Invalid HTTP method');
  } else {
    next();
  }
};

// Apply the middleware at the application level
app.use(validateHttpMethod);


// Apply the middleware to your list-view-router
listViewRouter.use(validateParameters);


module.exports = listEditRouter;