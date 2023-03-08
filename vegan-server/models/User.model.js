const mongoose = require("mongoose");
const { Schema, model } = mongoose;
 
const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  image: {type: String, default: "https://upload.wikimedia.org/wikipedia/commons/7/72/Avatar_icon_green.svg"}
});
 
module.exports = model("User", userSchema);