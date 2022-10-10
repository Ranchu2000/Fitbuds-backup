const mongoose = require('mongoose')

const fccSchema = new mongoose.Schema({
    name:{type: String,required: true},
    latitude:{type: Number,required: true},
    longitude:{type: Number,required: true},
})

module.exports = mongoose.model('Fcc', fccSchema)