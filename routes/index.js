var express = require("express");
var dotenv = require('dotenv').config();
var router = express.Router();
const fetch = require("node-fetch");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("index", { title: "Express" });
});

const OCD_API_KEY = process.env.API_KEY;

//RECIPE INSTRUCTIONS
router.get("/recipe/:id", function (req, res) {
  fetch(
    `https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${OCD_API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send(err));
});

//RECIPE GENERATOR
router.get("/recipe/findByIngredients/:ingredients", function (req, res) {
  fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${req.params.ingredients}&number=12&apiKey=${OCD_API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send(err));
});

// SHOPPING LIST
router.get("/recipe/:id/ingredientWidget", function (req, res) {
  fetch(
    `https://api.spoonacular.com/recipes/${req.params.id}/ingredientWidget.json?apiKey=${OCD_API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send(err));
});

router.get("/recipe/:id/ingredientWidgetHTML", function (req, res) {
  fetch(
    `https://api.spoonacular.com/recipes/${req.params.id}/ingredientWidget?apiKey=${OCD_API_KEY}`
  )
    .then((res) => res.text())
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send(err));
});

//MEAL PLANNER
router.get(
  "/recipe/search/:diet/:excludeIngredients/:intolerances/:cuisine",
  function (req, res) {
    fetch(
      `https://api.spoonacular.com/recipes/search?diet=${req.params.diet}&excludeIngredients=${req.params.excludeIngredients}&intolerances=${req.params.intolerances}&cuisine=${req.params.cuisine}&number=21&apiKey=${OCD_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        res.send(data);
      })
      .catch((err) => res.send(err));
  }
);

module.exports = router;
