const { Schema, model } = require("mongoose");
//name, login, email, password, birthday
const schema = new Schema({
  name: { type: String, required: true },
  login: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthday: { type: String, required: true },
  image: { type: String },
  sex: { type: String },
});

module.exports = model("User", schema);
