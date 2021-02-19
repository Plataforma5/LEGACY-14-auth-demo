const express = require("express");
const router = express.Router();

const passport = require("passport");
const User = require("../models");

/***** DEMO BASIC AUTH ******/
const basicAuth = require("../auth/basica");

/*
router.get('/', basicAuth, (req, res) => {
  console.log("Basic Auth OK!")
  res.send(templates.basic)
})
*/

/******************************/

function isLogedIn(req, res, next) {
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return true if user is logged in, thanks to passport
    next();
  } else {
    res.status(401).send("unauthorized");
  }
}

router.get("/private", isLogedIn, (req, res) => {
  res.status(200).send("entraste a una ruta privada!!!");
});

router.get("/isLogin", (req, res) => {
  if (req.user) return res.json(req.user);
  return res.json({});
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  const user = req.user;

  console.log("USER", req.user);
  console.log("autentico Ok!!!!W");

  console.log(req.cookies);
  res.status(200).json(user);
});

router.post("/register", (req, res, next) => {
  User.create(req.body)
    .then((user) => {
      setTimeout(() => {
        res.status(201).json(user);
      }, 1000);
    })
    .catch(next);
});

router.post("/logout", (req, res) => {
  if (req.isAuthenticated()) {
    req.logout();
  }

  res.sendStatus(204);
});

/*  LOGIN WITH CUSTOM ERROR

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next("Algo mio" + err) }
    if (!user) {
      // *** Display message without using flash option
      // re-render the login form with a message
      return res.json({ message: info.message })
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      // Estamos logeados!
      return res.json(user)
    });
  })(req, res, next);
});
*/

module.exports = router;
