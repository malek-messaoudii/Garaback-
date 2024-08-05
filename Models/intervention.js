const mongoose = require('mongoose');

const interventionSchema = new mongoose.Schema({
  utilisateur: {
    email: { type: String },  },
  titre: { type: String, required: true },
  pdf: { type: String},
  kilo: { type: Number, required: true },
  datec: { 
    type: Date, 
    default: () => new Date() 
  },
  emailperso: { type: String },
});

const Intervention = mongoose.model('Intervention', interventionSchema);
module.exports = Intervention;
