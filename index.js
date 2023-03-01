if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
// const mongoose = require("mongoose");
// const expressLayouts = require("express-ejs-layouts");
const bcrypt = require("bcrypt");
// const cookieParser = require("cookie-parser");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const { nanoid } = require("nanoid");
const port = process.env.PORT || 5000;

const initializePassport = require("./utils/passport-config");
initializePassport(
  passport,
  (email) => {
    users.find((user) => user.email === email);
  },
  (id) => users.find((user) => user.id === id)
);

const users = [];

app.set("view engine", "ejs");
// app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// app.use(cookieParser());

function isAuthenticated(req, res, next) {
  if (req.session.user) next();
  else next("route");
}

app.get("/", (req, res) => {
  res.render("Hello");
});

app.get("/dashboard", (req, res) => {
  res.render("index", {
    layout: "partials/main-layout",
    title: "Dashboard",
    isLogin: true,
  });
});

app.get("/tambah", (req, res) => {
  res.render("tambah", {
    layout: "partials/main-layout",
    title: "Tambah Data",
    isLogin: true,
  });
});

app.get("/update", (req, res) => {
  res.render("update", {
    layout: "partials/main-layout",
    title: "Update Data",
    isLogin: true,
  });
});

app.get("/hapus", (req, res) => {
  res.render("hapus", {
    layout: "partials/main-layout",
    title: "Hapus Data",
    isLogin: true,
  });
});

app.get("/lihat", (req, res) => {
  res.render("lihat", {
    layout: "partials/main-layout",
    title: "Lihat Data",
    isLogin: true,
  });
});

app.get("/login", (req, res) => {
  res.render("login", {
    layout: "login",
    title: "Login",
  });
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.get("/register", (req, res) => {
  res.render("register", {
    layout: "register",
    title: "Register",
  });
});

app.post("/register", async (req, res) => {
  console.log(req.body.email, req.body.password);
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: nanoid(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
  console.log(users);
});

app.get("/logout", (req, res, next) => {
  req.session.email = null;
  req.session.save(function (err) {
    if (err) next(err);

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) next(err);
      res.redirect("/");
    });
  });
});

app.listen(port, () => {
  console.log(`Server berjalan pada http://localhost:${port}`);
});
