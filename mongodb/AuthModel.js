const mongoose = require("mongoose"); // import mongoose
let SignUp = {
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true, minlength: 8, maxlength: 20 },
  ConfirmPassword: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 20,
  },
  AccountID: { type: String, required: true, unique: true },
};
var SignUpSchema = new mongoose.Schema(SignUp);
module.exports = mongoose.model("SignUp", SignUpSchema);
