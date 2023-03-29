require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;

const getInfoApi = async () => {
  const apiUrl = await axios(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );

  const infoApi = apiUrl.data.results.map((e) => {
    return {
      id: e.id,
      title: e.title,
      summary: e.summary,
      healthScore: e.healthScore,
      img: e.image,
      steps: e.analyzedInstructions.steps.map((d) => {
        return { step: d.step };
      }), // Se almacena un array de objetos con los paso a paso
      diets: e.diets.map((d) => {
        return { name: d };
      }), //Se almacena un array con los tipos de dietas
      createDb: false,
    };
  });

  return infoApi;
};

module.exports = getInfoApi;
