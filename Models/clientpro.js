const mongoose = require('mongoose');
const User = require('./user');

const clientSchema = new mongoose.Schema({
    nomg: { type: String, required: true },
    nums: { type: Number, required: true },
    nomsoc: { type: String, required: true },

});

module.exports = User.discriminator('Clientpro', clientSchema);