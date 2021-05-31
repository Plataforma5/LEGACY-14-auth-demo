const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const routes = require("./src/routes");
const db = require("./src/db");
const User = require("./src/models");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// req.cookies | parser middelwares |  https://www.npmjs.com/package/cookie-parser
app.use(cookieParser());

// req.session | express-session init | https://www.npmjs.com/package/express-session
app.use(
  session({
    secret: "bootcamp",
    resave: true,
    saveUninitialized: true,
  })
);

// PASSPORT
app.use(passport.initialize()); // passport init
app.use(passport.session()); // https://stackoverflow.com/questions/22052258/what-does-passport-session-middleware-do/28994045#28994045

// auth strategy definition
// https://github.com/jaredhanson/passport-local
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    function (inputEmail, password, done) {
      User.findOne({ where: { email: inputEmail } })
        .then((user) => {
          if (!user) {
            return done("Incorrect username.", false);
          }
          if (!user.validPassword(password)) {
            return done("Incorrect password.", false);
          }
          return done(null, user); //ESTA TODO OK!
        })
        .catch(done);
    }
  )
);

// Serialize y Deserialize
// las funciones serialize y deserialize se encargan de interactuar cookie|session para lograr
// esa persistencia entre server y browser, utilizando cookies y session.

// serialize: how we save the user
// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
// probar cuando sucede lo de serializeUser luego del /login? y luego que sucede con el
// deserialize al momento que el usuario ingresa a /private logeado..
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserialize: how we look for the user
passport.deserializeUser(function (id, done) {
  User.findByPk(id).then((user) => done(null, user));
});

app.use("/api", routes);

// upload static files
app.use(express.static(__dirname + "/public"));

// Html que devolvera con el front de la aplicacion
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// MIDDLEWARE ERROR
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send(err);
});

db.sync({ force: false })
  .then((con) => {
    console.log(
      `dialect: ${con.options.dialect} database ${con.config.database} connected at ${con.config.host}:${con.config.port}`
    );
    app.listen(8080, () => console.log("SERVER LISTENING AT PORT 8080"));
  })
  .catch((error) => console.log(error));
