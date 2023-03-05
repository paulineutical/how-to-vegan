const express = require("express");
const Recipe = require("../models/Recipe.model");

const router = express.Router();

router.post("/recipe", async (req, res, next) => {
  const { title, ingredients, instruction } = req.body;


  await Recipe.create({title, ingredients, instruction});

  res.send();
  });

module.exports = router;
