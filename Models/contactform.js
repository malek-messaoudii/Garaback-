const mongoose = require('mongoose');

const ContactFormSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true },
  telephone:{type:String, required:true},
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const ContactForm = mongoose.model('ContactForm', ContactFormSchema);
module.exports = ContactForm;
