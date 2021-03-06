const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    name:{type: String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true}
});

// userSchema.methods.encryptPassword = function (password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
// };

// userSchema.methods.validPassword = function (password) {
//     return bcrypt.compareSync(password, this.password);
// };

module.exports = mongoose.model('User', userSchema);
