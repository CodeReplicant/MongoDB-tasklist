const express = require("express");
const listEditRouter = express.Router();
const fs = require('fs');


listEditRouter.use(express.json()); // Parse JSON in the body of requests

const list = JSON.parse(fs.readFileSync('task.json', 'utf8'));//lectura de archivo principal task.json
////MIDLEWARE////////////////////////////
// Middleware to handle invalid or missing attributes for tasks
//Middleware to handle empty request bodies

// Middleware to handle empty request bodies
function handleEmptyBody(req, res, next) {
  if(req.method=='POST'||req.methodd=='PUT'){ return 
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Request body is empty' });
  }

};
next();
}

// Route to create a task
listEditRouter.post("/create", handleEmptyBody, (req, res) => {
  const newObject = req.body;
  list.push(newObject);
  fs.writeFileSync('task.json', JSON.stringify(list, null, 2));
  res.send("Task created successfully");
});

// Route to delete a task, request for example (id->2)  by localhost:3001/delete/2 , 
listEditRouter.delete("/delete/:id", handleEmptyBody,(req, res) => {
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
listEditRouter.put("/update/:id", (req, res, handleEmptyBody, ) => {
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

// Apply the middlewares to the router
listEditRouter.use(handleEmptyBody);


module.exports = listEditRouter;