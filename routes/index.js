var express = require("express");
var dotenv = require('dotenv').config();
var router = express.Router();
const fetch = require("node-fetch");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send({ title: "Foodie Planner API" });
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
  const ingredients = req.params.ingredients;
  console.log("Searching recipes with ingredients:", ingredients);
  
  fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=12&ranking=2&apiKey=${OCD_API_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (Array.isArray(data)) {
        res.send(data);
      } else {
        res.send([]);
      }
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, results: [] });
    });
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
    // Build query parameters, excluding "0" values
    const params = new URLSearchParams();
    params.append("apiKey", OCD_API_KEY);
    params.append("number", "21");
    params.append("addRecipeInformation", "true");
    
    if (req.params.diet && req.params.diet !== "0") {
      params.append("diet", req.params.diet);
    }
    if (req.params.excludeIngredients && req.params.excludeIngredients !== "0") {
      params.append("excludeIngredients", req.params.excludeIngredients);
    }
    if (req.params.intolerances && req.params.intolerances !== "0") {
      params.append("intolerances", req.params.intolerances);
    }
    if (req.params.cuisine && req.params.cuisine !== "0") {
      params.append("cuisine", req.params.cuisine);
    }

    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Transform response to match expected format
        res.send({ results: data.results || [] });
      })
      .catch((err) => {
        console.error("API Error:", err);
        res.status(500).send({ error: err.message, results: [] });
      });
  }
);

module.exports = router;
