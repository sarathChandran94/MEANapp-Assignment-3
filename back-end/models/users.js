const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: String,
    email: String,
    password: String
});

module.exports = mongoose.model('user', UserSchema);
