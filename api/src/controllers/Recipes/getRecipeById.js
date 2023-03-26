let {recipe} = require("../../db");
const axios = require("axios");
require('dotenv').config();
const { API_KEY } = process.env;

const getRecipeById = async (req, res) => {
    const {idRecipe} = req.params;
  try {
    const response = recipe.findByPk(idRecipe);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({msg: error.message});
  }
}

module.exports = getRecipeById