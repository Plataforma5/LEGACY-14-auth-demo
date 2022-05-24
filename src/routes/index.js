const express = require("express");
const passport = require("passport");
const router = express.Router();

const User = require("../models");

function itsLoggedIn(req, res, next) {
  if (req.isAuthenticated()) next();
  else res.sendStatus(401);
}

router.get("/isLogin", itsLoggedIn, (req, res) => {
  res.send(req.user);
});

router.get("/private", itsLoggedIn, (req, res) => {
  res.send(req.user);
});

router.get("/private-2", (req, res) => {
  res.send(req.user);
});

router.post("/register", (req, res) => {
  User.create(req.body).then((user) => {
    res.status(201).send(user);
  });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("REQ.USER", req.user);

  res.send(req.user);
});

router.post("/logout", (req, res) => {
  req.logout();
});

module.exports = router;
