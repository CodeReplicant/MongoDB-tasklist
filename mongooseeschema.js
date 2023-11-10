const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tareaSchema = new Schema({
  id: {
    type: Number,
    required: true, // El campo id es obligatorio
  },
  taskname: String, // El campo name es no es obligatorio

  descripcion : String,
});

// Crear un modelo basado en el esquema
const tareaModelo = mongoose.model('tareascollection', tareaSchema);

module.exports = tareaModelo;
