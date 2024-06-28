const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    telephone: String,
    email: { type: String, unique: true },
    adresse: String,
    codep: String,
    mdp: String,
    cmdp: String,
    role: { type: String, enum: ['clientprivate', 'clientpro', 'garagiste']},

});

module.exports = mongoose.model('users', userSchema);



