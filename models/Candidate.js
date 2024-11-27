const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String }, // Champ pour le numéro de téléphone
  email: { type: String },
  location: { type: String },
  skills: { type: [String], default: [] },
  cv: { type: String }, // URL ou chemin vers le fichier CV
  linkedin: { type: String },
  headline: { type: String },
  addedAt: { type: Date, default: Date.now },

});

module.exports = mongoose.model('Candidate', candidateSchema);
