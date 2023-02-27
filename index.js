const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

const port = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(
  session({
    secret: "awokwokwok apaan tuh",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

function isAuthenticated(req, res, next) {
  if (req.session.user) next();
  else next("route");
}

app.get("/", (req, res) => {
  // res.send("Hello");
  console.log(req.session);
  if (req.session) {
    res.redirect("/dashboard");
  } else {
    res.redirect("/login");
  }
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

app.post("/login", (req, res, next) => {
  if (req.body.email === "" || req.body.password === "") res.redirect("/login");
  if (
    req.body.email === "admin@yanuar.my.id" &&
    req.body.password === "admin"
  ) {
    req.session.email = req.body.email;
    res.redirect("/dashboard");

    req.session.save(function (err) {
      if (err) return next(err);
      res.redirect("/");
    });
    // console.log(req.session);
  } else {
    res.redirect("/login");
  }
  // res.json(req.body);
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
