const mongoose = require('mongoose');

const vehiculeSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    immatriculation: { type: String, required: true },
    kilo: { type: Number, required: true },
    boite: { type: String, required: true }, 
    energie: { type: String, required: true }, 
    datedernierrev: { type: Date, required: true }, 
    email: { type: String, required: true },
    rdv: { type: String, default: 'Pas encore programmé' } 
});

module.exports = mongoose.model('vehicule', vehiculeSchema);
