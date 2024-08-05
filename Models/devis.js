const mongoose = require('mongoose');

const devisSchema = new mongoose.Schema({
  vehicule: {
    make: { type: String },
    model: { type: String },
    immatriculation: { type: String},
    kilo: { type: Number}
  },
  prestation: {
    titre: { type: String },
    selectedTypes: [{ type: String }],
    options: [{ type: String }],
    desc: { type: String }
  },
  utilisateur: {
    type: { type: String, enum: ['particulier', 'entreprise'] }, // Update here
    nom: { type: String },
    prenom: { type: String},
    email: { type: String},
    telephone: { type: String },
    adresse: { type: String },
    codePostal: { type: String },
    siret: { type: String}
  },
  datedernierrevision: { type: Date },
  dateCreation: { type: Date, default: Date.now },
  status: { type: String, default: 'en cours de validation' },
  typedemande: { type: String, default: 'Demande de devis' },
  rdv : { type: String, default: 'Pas encore programmé' },
  devisrec: { type: String, default: 'Pas encore reçu' },
  voiturepret: { type: String },
  images: [{ type: String, default: "" }],
  numdevis: { type: Number, unique: true },
});

module.exports = mongoose.model('Devis', devisSchema);
