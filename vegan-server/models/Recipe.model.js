const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
    title: { type: String, required: true },
    imageUrl: String,
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    allergies: { 
        gluten: Boolean,
        soy: Boolean,
        peanut: Boolean,
        almond: Boolean
    }
});
   
module.exports = model("Recipe", recipeSchema);