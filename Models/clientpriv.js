const mongoose = require('mongoose');
const User = require('./user');

const clientprivSchema = new mongoose.Schema({
    datenais: { type: Date }
});

module.exports = User.discriminator('Clientpriv', clientprivSchema);
