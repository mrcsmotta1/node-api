const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");

//iniciando o app
const app = express();

mongoose.connect("mongodb://localhost:27017/nodeapi", {
  useNewUrlParser: true
});
requireDir("./src/models");

const Product = mongoose.model("Product");

//Primeira rota
app.get("/", (req, res) => {
  Product.create({
    title: "React Native",
    description: "Build native apps with React",
    url: "http://github.com/facebook/react-native"
  });

  return res.send("hello word!");
});

app.listen(3001);
