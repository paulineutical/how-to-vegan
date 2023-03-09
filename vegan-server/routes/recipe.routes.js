const express = require("express");
const Recipe = require("../models/Recipe.model");
const fileUploader = require("../config/cloudinary.config");

const router = express.Router();

router.post("/recipe", async (req, res, next) => {
  await Recipe.create(req.body);
  res.send();
  });

router.get("/recipe/:recipeId", (req, res, next) => {
  const recipeId = req.params.recipeId
  console.log("RECIPEID HERE", req.params.recipeId)
  Recipe.findById(recipeId)
    .then(response => {
      console.log(response)
      res.json(response)
    })
    .catch(err => console.log(err))
})

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ imageUrl: req.file.path });
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
