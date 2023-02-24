const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const app = express();

const port = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/dashboard");
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

app.listen(port, () => {
  console.log(`Server berjalan pada http://localhost:${port}`);
});
