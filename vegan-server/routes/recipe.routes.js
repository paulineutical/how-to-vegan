const express = require("express");
const Recipe = require("../models/Recipe.model");
const fileUploader = require("../config/cloudinary.config");

const router = express.Router();

router.post("/recipe", async (req, res, next) => {
  await Recipe.create(req.body);
  res.send();
  });

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  res.json({ imageUrl: req.file.path });
});

  // TODO: route um ein recipe zu holen
  // /recipes/:id

router.get("/recipes", (req, res, next) => {
  Recipe.find()
    .then(response => {
      console.log(response)
      res.json(response)
    })
    .catch(err => console.log(err))
})

module.exports = router;
