const { Router } = require("express");
const verifyToken = require('../middleware/verify-token.js');
const { getOneSpecies, getAllSpecies, addSpecies, removeSpecies, editSpecies } = require("../controllers/species.js");

const router = Router();

router.use(verifyToken);
router.post('/edit/:speciesId', editSpecies);
router.post('/remove/:speciesId', removeSpecies);
router.post('/add/', addSpecies);
router.get('/get/:speciesId', getOneSpecies);
router.get('/', getAllSpecies);

module.exports = router;