const { Router } = require('express');

const { getRecipeById, postRecipe, getRecipesByName } = require("../../controllers/Recipes")

const router = Router();

router.get("/", getRecipesByName);

router.get("/:id", getRecipeById);

router.post("/", postRecipe);

module.exports = router;