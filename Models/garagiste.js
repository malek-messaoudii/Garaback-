const mongoose = require('mongoose');
const User = require('./user');

const garagiste = new mongoose.Schema({
    
    id: { type: Number, required: true },
    noms: { type: String, required: true },    
    nums: { type: Number, required: true },    
    nafc: { type: Number, required: true },    
    fax: { type: Number},   
    website: { type: String},   
    genre: { type: String},    

});

module.exports = User.discriminator('Garagiste', garagiste);