let { recipe } = require("../../db");

const postRecipe = async (req, res) => {
  try {
    const { nombre, imagen, resumen, nivelsaludable, pasoapaso } = req.body;

    if (nombre && imagen && resumen && nivelsaludable && pasoapaso) {

      const recepeObj = { nombre, imagen, resumen, nivelsaludable, pasoapaso };

      const recipeGuardado = await recipe.create(recepeObj);

      return res.status(200).json(recipeGuardado);
    }

    req.status(400).send({ msg: "Faltan datos" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

module.exports = postRecipe;
