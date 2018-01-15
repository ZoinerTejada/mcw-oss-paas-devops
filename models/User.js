var mongoose = require('mongoose');

// Create the User schema, showing the shape of the user database entity.
var UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String, required: false },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, default: 'US', required: true },
    postalCode: { type: String, required: true },
    phone: { type: String, required: true },
    createdDate: { type: Date, default: Date.now, required: true },
    modifiedDate: { type: Date, default: Date.now, required: true }
  });

// Export the module
module.exports = mongoose.model('User', UserSchema);