const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const express = require("express");

const routes = require("./routes");
const db = require("./db");
const User = require("./models");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const app = express();

// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
//   })
// );

app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// express session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

// PASSPORT INITIALIZE
app.use(passport.initialize());
// PASSPORT SESSION
app.use(passport.session());

// Local Strategy
passport.use(
  new LocalStrategy({ usernameField: "email" }, function (
    email,
    password,
    done
  ) {
    User.findOne({ where: { email } })
      .then((user) => {
        if (!user) done(null, false);
        else {
          if (user.validPassword(password)) done(null, user);
          else done(null, false);
        }
      })
      .catch((err) => {
        done(err, false);
      });
  })
);

// Serialize & Deserialize
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

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
