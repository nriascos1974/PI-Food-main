let {recipe} = require("../../db");
const axios = require("axios");
require('dotenv').config();
const { API_KEY } = process.env;

const getRecipesByName = async (req, res) => {
    const {name} = req.query;
  try {
    const response = recipe.findAll(
        { where: { nombre: name } }
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({msg: error.message});
  }
}

module.exports = getRecipesByName