const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const routes = require('./routes');
const db = require('./config/db');
const User = require('./models');

const app = express();

// req.body
app.use(bodyParser.urlencoded({ extended: false }));

// req.cookies | parser middelwares |  https://www.npmjs.com/package/cookie-parser
app.use(cookieParser());

// req.session | express-session init | https://www.npmjs.com/package/express-session
app.use(session({ 
  secret: "bootcamp",
  resave: true,
  saveUninitialized: true
}))

/**** PASSPORT */
app.use(passport.initialize()); // passport init
app.use(passport.session()); // https://stackoverflow.com/questions/22052258/what-does-passport-session-middleware-do/28994045#28994045

// auth strategy definition
// https://github.com/jaredhanson/passport-local
passport.use(new LocalStrategy({ usernameField: 'email' },
  function(inputEmail, password, done) {
    
    User.findOne({ where: {email: inputEmail} })
      .then(user => {
        if (!user) {
          return done('Incorrect username.', false);
        }
        if (!user.validPassword(password)) {
          return done('Incorrect password.', false);
        }
        return done(null, user); //ESTA TODO OK!
      })
      .catch(done);
  }
));

// **** 
// Serialize y Deserialize
// las funciones serialize y deserialize se encargan de interactuar cookie|session para lograr
// esa persistencia entre server y browser, utilizando cookies y session.

// serialize: how we save the user
// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
// probar cuando sucede lo de serializeUser luego del /login? y luego que sucede con el 
// deserialize al momento que el usuario ingresa a /private logeado..
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// deserialize: how we look for the user
passport.deserializeUser(function(id, done) {
    User.findByPk(id)
        .then(user => done(null, user))
});

/********************* */

app.use('/', routes);

db.sync({ force: false }).then((con) => {
  console.log(`${con.options.dialect} database ${con.config.database} connected at ${con.config.host}:${con.config.port}`)
  app.listen(3000, () => console.log('SERVER LISTENING AT PORT 3000'))
})
