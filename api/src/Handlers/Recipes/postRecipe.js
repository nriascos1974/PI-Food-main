let { Recipe } = require("../../db");

const postRecipe = async (req, res) => {
  const { title, summary, healthScore, steps, image, diets } = req.body;
  try {
    if (title && summary && healthScore && steps && image && diets) {
      const recipeObj = { title, summary, healthScore, steps, image };

      const recipeGuardado = await Recipe.create(recipeObj);
      await recipeGuardado.addDiet(diets);

      return res.status(200).json(recipeGuardado);
    }

    req.status(400).send({ msg: "Faltan datos" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

module.exports = postRecipe;
