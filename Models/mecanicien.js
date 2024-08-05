const mongoose = require('mongoose');

const MecanicienSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
  status: { type: String, required: true },
  genre: { type: String },
  emailperso: { type: String },
});

const Mecanicien = mongoose.model('Mecanicien', MecanicienSchema);
module.exports = Mecanicien;
