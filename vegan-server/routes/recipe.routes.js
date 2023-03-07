const express = require("express");
const Recipe = require("../models/Recipe.model");

const router = express.Router();

router.post("/recipe", async (req, res, next) => {
  const { title, ingredients, instructions } = req.body;
  // in req.body: tags (String)
  tags.split(" ")
  await Recipe.create({title, ingredients, instructions});
  res.send();
  });


router.get("/recipes", (req, res, next) => {
  Recipe.find()
    .then(response => {
      console.log(response)
      res.json(response)
    })
    .catch(err => console.log(err))
})

module.exports = router;
