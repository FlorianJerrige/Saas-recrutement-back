// backend/models/Partner.js
const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  contact: { type: String },
  address: { type: String },
  responsable: { type: String },
  contract: { type: String },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }], // Références des postes ouverts
});

module.exports = mongoose.model('Partner', partnerSchema);
