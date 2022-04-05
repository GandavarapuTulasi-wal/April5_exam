var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  username: { type: String, required: true, maxLength: 20 },
});
module.exports = mongoose.model('User', UserSchema);
