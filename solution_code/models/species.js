const mongoose = require('mongoose');

const speciesSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
    }
});


module.exports = mongoose.model('Species', speciesSchema);