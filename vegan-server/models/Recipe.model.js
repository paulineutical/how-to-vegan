const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    ingredients: { type: String, required: true },
    instruction: { type: String, required: true },
    allergies: { type: [String], required: true }
});
   
module.exports = model("User", userSchema);