const mongoose = require('mongoose');

const feedingLogSchema = new mongoose.Schema(
  {
    notes: {
      type: String,
      required: true
    },
    keeper: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    species: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Species"
      },
    field: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Field"
      },
    feedingLog:[feedingLogSchema]
    
});


module.exports = mongoose.model('Animal', animalSchema);