const express = require('express');
const fs = require('fs');
const app = express();
const port = 3001;
app.use(express.json());
const editroute=require("./Editrouter.js");
const viewroute=require("./Viewrouter.js");
const authroute = require("./auth.js");
const main = require("./databasemongo");
const connectDBA = require("./mongooseAtlas.js");
const tareaModelo = require('./mongooseeschema'); // Importar el esquema

app.use(authroute);
app.use(editroute);
app.use(viewroute);

 
app.get('/base', async (req, res) => {

  let database  = await connectDBA();

  // Crear una instancia de modelo de tarea
  const nuevatarea = new tareaModelo({
    id: 1,
    taskname: 'Terminar front',
    descripcion: 'terminar react y mongodb',
  });
  
  // Guardar el nuevo usuario en la base de datos
  nuevatarea.save();  

  console.log('Get request equest a la base Atlas');

  const tareas = await tareaModelo.find({});// trate de los squemas con mongose
  res.status(200).send({tareas});

});

app.get('/tareas', async (req, res) => {                                                                                                             
  //database export of main function
  let database = await main();


    const collection = database.collection('tareas');

    const tareas = await collection.find({}).toArray();//logica mongo db CRUB para manipurar return 
// the following code examples can be pasted here...
    return res.status(200).send(tareas);
});

app.delete('/tareas/:id', async (req, res) => {
  //database export of main function
  let database = await main();
//.then((db)=>{ database=db;console.log("Connected to MongoDB") }).catch(console.error);

    const collection = database.collection('tareas');

    const tareas = await collection.deleteOne({});//logica mongo db CRUB para manipurar return 
// the following code examples can be pasted here...
    return res.status(200).send(tareas);
  
});

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

//abriendo el servidor
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}
   Servidor de sebastian salinas Activo, 
   Esperando request.... 
  
  `);
});
