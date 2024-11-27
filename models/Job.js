const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  experienceRequired: { type: Number, required: true }, // Années d'expérience
  skills: { type: [String], required: true }, // Liste de compétences techniques
  location: { type: String },
  salary: {
    min: { type: Number },
    max: { type: Number },
  },
  contractType: { type: String }, // CDI, CDD, etc.
  applicationLink: { type: String },
  status: { type: String, default: 'Open' }, // Ouvert ou Clôturé
  partner: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner', required: true }, // Référence au partenaire
  publishedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', jobSchema);
