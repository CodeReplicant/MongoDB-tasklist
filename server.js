const express = require('express');
const fs = require('fs');
const app = express();
const port = 3001;
app.use(express.json());
const editroute=require("./Editrouter.js");
const viewroute=require("./Viewrouter.js");



app.use(editroute);
app.use(viewroute);






app.get('/', (req, res) => {

  // Read tasks from the 'task.json' file
  fs.readFile('task.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const tasks = JSON.parse(data);
      const formattedData = JSON.stringify(tasks, null, 2); // Adds spacing and indentation

      res.status(200).set('Content-Type', 'application/json').send(formattedData);
    }
  });

});






app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
