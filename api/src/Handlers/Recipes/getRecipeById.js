let { recipe } = require("../../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

//*HANDLER PARA LA CONSULTA POR ID
const getRecipeById = async (req, res) => {
  try {
    //*OBTENGO EL ID QUE VIENE POR PARAMS
    const { id } = req.params;
    //*VALIDO QUE EXISTA EL ID, SINO DEVUELVO RESPUESTA AL USUARIO QUE NO SE ENVIO ID
    if (!id)
      return res
        .status(400)
        .send({ msg: "El Id de la Receta no fue enviado." });
    //* REALIZO LA BUSQUEDA EN BASE DE DATOS CONSULTANDO SI EL ID CONTIENE - EN SU COMPOSICION
    if (id.includes("-")) {
      const recipeBd = await recipe.findByPk(id);
      res.status(200).json(recipeBd);
      //*EN CASO CONTRARIO HAGO LA CONSULTA A LA API
    } else {
      const response = await axios(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );
      const recipeApi = {
        id: response.data.id,
        title: response.data.title,
        summary: response.data.summary,
        healthScore: response.data.healthScore,
        img: response.data.image,
        steps: response.data.analyzedInstructions.steps.map((d) => {
          return { step: d.step };
        }), // Se almacena un array de objetos con los paso a paso
        diets: response.data.diets.map((d) => {
          return { name: d };
        }), //Se almacena un array con los tipos de dietas
      };
      res.status(200).json(recipeApi);
    }
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

module.exports = getRecipeById;
