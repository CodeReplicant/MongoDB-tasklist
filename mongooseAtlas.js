const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://sdsalinasm28:metalgear@clustersesamo.vd0oavd.mongodb.net/proyectodatabase?retryWrites=true&w=majority';
const connectDBA = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Conexión exitosa a MongoDB atlas');
    return mongoose;
  } catch (error) {
    console.error('Error de conexión a MongoDB Atlas:', error);
  }
};


module.exports = connectDBA

