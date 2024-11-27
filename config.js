// backend/config.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://florianjerrige:jrlHVPNgBng0JWzK@cluster1.l3wza.mongodb.net/');
    console.log('Connexion à MongoDB réussie');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    process.exit(1);
  }
};


module.exports = connectDB;
