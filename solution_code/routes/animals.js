const { Router } = require("express");
const verifyToken = require('../middleware/verify-token.js');
const { renameAnimal, getOneAnimal, getAllAnimals, feedAnimal, moveAnimal, addAnimal, removeAnimal } = require("../controllers/animals.js");

const router = Router();

router.use(verifyToken);

router.post('/feed/:animalId', feedAnimal);
router.post('/rename/:animalId', renameAnimal);
router.post('/move/:animalId', moveAnimal);
router.post('/remove/:animalId', removeAnimal);
router.post('/add/', addAnimal);
router.get('/get/:animalId', getOneAnimal);
router.get('/', getAllAnimals);

module.exports = router;