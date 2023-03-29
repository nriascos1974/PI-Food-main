const getInfoApi = require("../Recipes/GetInfoApi");
const { Diet } = require("../../db");

const getDietsTypesApi = async () => {
  const recipesApi = await getInfoApi();
  const dietsAll = [];

  //*mapeo la informacion devuelta de cada receta para obtener los tipos de dietas
  const dietAllApi = recipesApi.map((x) => x.diets);

  dietAllApi.forEach((x) => x.forEach((y) => dietsAll.push(y)));

  //*retorno un array con los tipos de dietas devueltas por la consulta a la API, como puede haber repetidas
  //* como pueden haber dietas repetidas las paso por un objeto set.
  return [...new Set(dietsAll)];
};

//* con esta funcion inserto tipos de dietas siempre y cuando no existan a partir de las recetas consultadas a la API
const insertDiets = async () => {
  const diets = await getDietsTypesApi();

  //*obtengo un array de findorcreate por cada dieta, esto se me convierte en un array de promesas
  let allDiets = diets.map((e) => Diet.findOrCreate({ where: { name: e } }));
  //* resuelvo todas las promesas y una vez realizado devuel un string que se cargaron las dietas
  try {
    Promise.all(allDiets).then((e) => console.log("Loaded Diets..."));
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = insertDiets;
