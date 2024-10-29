const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    hashedPassword: {
        type: String,
        required: true
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }],
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.hashedPassword;
    }
});

module.exports = mongoose.model('User', userSchema);