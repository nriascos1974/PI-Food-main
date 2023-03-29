const { Diet } = require("../../db");

const loaderDiets = async () => {
    const diets = [
      "gluten free",
      "paleolithic",
      "vegetarian",
      "lacto ovo vegetarian",
      "vegan",
      "pescatarian",
      "primal",
      "whole 30",
      "fodmap friendly",
      "dairy free",
      "ketogenic",
    ];
    
    diets.forEach(async (element) => await Diet.create({ name: element }));
  }

  module.exports = loaderDiets