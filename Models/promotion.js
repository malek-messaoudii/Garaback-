const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true
  },
  prestation: {
    titre: {
      type: String,
      required: true
    },
  },
  mois: {
    type: String,
    required: true
  }
});

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
