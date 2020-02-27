const express = require('express');
const router = express.Router();
const templates = require('../templates');
const User = require('../models');


/***** DEMO BASIC AUTH ******/
const basicAuth = require('../auth/basica')
/*
router.get('/', basicAuth, (req, res) => {
  console.log("Basic Auth OK!")
  res.send(templates.basic)
})
*/

/******************************/

/***** DEMO PASSPORT ******/
const passport = require('passport');

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('USER', req.user)
  console.log("autentico Ok!!!!W")
  res.redirect('/');
})

/******************************/

function isLogedIn(req, res, next) {
  if (req.isAuthenticated()) { //req.isAuthenticated() will return true if user is logged in, thanks to passport
    next();
  } else {
    res.redirect('/login');
  }
}

router.get('/login', (req, res) => {
  res.send(templates.login)
})

router.get('/register', (req, res) => {
  res.send(templates.register)
})

router.get('/public', (req, res) => {
  res.send(templates.public);
})

router.get('/private', isLogedIn, (req, res) => {
  res.send(templates.private);
})

router.post('/users', (req, res) => {
  User.create(req.body)
    .then(user => res.send(user))
})

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('USER', req.user)
  res.redirect('/');
})

router.get('/logout', (req, res) => {
  res.send(templates.logout);
})

router.post('/logout', (req, res) => {
  if (req.isAuthenticated()) {
    req.logout();
    res.redirect('/login')
  } else {
    res.redirect('/')
  }
})

module.exports = router