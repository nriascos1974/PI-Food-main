let {diet} = require("../../db");

const getDiets = async (req, res) => {
  try {
    const response = await diet.findAll()
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({msg: error.message});
  }
}

module.exports = getDiets