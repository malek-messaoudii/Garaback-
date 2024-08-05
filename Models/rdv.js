const mongoose = require('mongoose');

const rdvSchema = new mongoose.Schema({
    vehicule: {
        make: { type: String },
        model: { type: String },
        immatriculation: { type: String },
        kilo: { type: String }
    },
    numdevis: { type: Number},
    datesouhaite: { type: Date, required: true },
    heuresouhaite: { type: Number, required: true },  // Consider using String if you need flexibility
    titrepres: { type: String, required: true },
    desc: { type: String },
    voiturepret: { type: String },
    email: { type: String, match: /.+\@.+\..+/ },  // Email format validation
    rdv: { type: String, default: 'Pas encore programmé' },
    type: { type: String, default: 'Rdv' },
    devisrec: { type: Boolean, default: false },
    emailperso: { type: String, match: /.+\@.+\..+/ },  // Email format validation
    status: { type: String, default: 'En cours' },
    titre: { type: String },
    dateRestitution: { type: Date },
    heureRestitution: { type: Number },  // Consider using String if you need flexibility
    mecanicien: { type: String },
    titreTache: { type: String },
    dateTache: { type: Date },
    debutTache: { type: Number },
    finTache: { type: Number },
    nom: { type: String },
    prenom: { type: String }

});

module.exports = mongoose.model('Rdv', rdvSchema);
