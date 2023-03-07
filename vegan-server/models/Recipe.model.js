const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
    title: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    allergies: { type: [String], required: true }
});
   
module.exports = model("Recipe", recipeSchema);