var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

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
  phone: { type: String, required: false },
  createdDate: { type: Date, default: Date.now, required: true },
  modifiedDate: { type: Date, default: Date.now, required: true }
});

UserSchema.pre('save', function (next, err) {
  var user = this;

  if (!user.isNew && !user.isModified('password')) {
    return next();
  }

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  next();
});

UserSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({ 'email': email }, function (err, user) {
    if(err) return next(err);
    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            return callback(null, user);
        }
        else {
          var err = new Error('No email and password combination matching what was submitted was found. Please check your email address and password.');
          err.status =  204;
          return callback(err);
        }
    } 
    else {
        var err = new Error('No account with that email address was found.');
        err.status =  204;
        return callback(err);
    }
});
}

// Export the module
var User = mongoose.model('User', UserSchema);
module.exports = User;