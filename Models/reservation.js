const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  dateDebut: {
    type: Date,
    required: true
  },
  dateFin: {
    type: Date,
    required: true
  },
  prestation: {
    type: String,
    required: true
  },
  utilisateur: {
    nom: { type: String },
    prenom: { type: String },
    email: { type: String, required: true },
    telephone: { type: String }
  },
  vehicule: {
    make : {type : String},
    immatriculation: { type: String},
    kilometrage: { type: Number },
    dateDerniereRevision: { type: Date}
  },
  message: {
    type: String
  },
  numdevis: { type: Number}

});

module.exports = mongoose.model('Reservation', ReservationSchema);