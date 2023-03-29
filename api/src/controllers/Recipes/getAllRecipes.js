const GetInfoApi = require("./GetInfoApi");
const getDBInfo = require("./GetInfoDb");
const insertDiets = require("../Diets/insertInfoDietApi");

const getAllRecipes = async () => {
  //*obtengo la informacion a partir de la API
  const infoApi = await GetInfoApi();
  //*como ya tengo la informacion de la API, cargo los tipos de Dietas que vienen de ahi
  await insertDiets();
  //*obtengo las recetas que han sido creadas por el usuario para reunirlas con las devuelta por la API
  const infoDb = await getDBInfo();
  const allRecipes = [...infoApi, ...infoDb];
  return allRecipes;
};

module.exports = getAllRecipes;
