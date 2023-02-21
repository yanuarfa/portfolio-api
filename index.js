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
  res.render("index", {
    layout: "partials/main-layout",
    title: "Home",
    isLogin: false,
  });
});

app.listen(port, () => {
  console.log(`Server berjalan pada http://localhost:${port}`);
});
