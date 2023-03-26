const { Router } = require('express');

const { getDiets } = require("../../controllers/Diets")

const router = Router();

router.get("/", getDiets);

module.exports = router;