const router = require("express").Router();
const User = require("../models/User.model");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get("/user/:userid", (req, res, next) => {
  const userid = req.params.userid
  User.findById(userid)
  .then ((user) => {
    res.status(200).json(user);
  })
  .catch(err => console.log(err))
});

module.exports = router;
