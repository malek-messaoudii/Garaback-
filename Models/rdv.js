const mongoose = require('mongoose');

const rdvSchema = new mongoose.Schema({
    vehicule: {
        make: { type: String },
        model: { type: String },
        immatriculation: { type: String },
      },
      numdevis: { type: Number, required: true },
      datesouhaite: { type: Date, required: true }, 
      heuresouhaite: { type: Number, required: true }, 
    titrepres: { type: String, required: true },
        desc: { type: String } ,
      voiturepret: { type: String},
      email : {type:String},
      rdv: { type: String, default: 'Pas encore programmé' } ,
      type: { type: String, default: 'Rdv' },
      devisrec : {type : Boolean, default : false}

});

module.exports = mongoose.model('rdv', rdvSchema);
