const { Router } = require("express");
const verifyToken = require('../middleware/verify-token.js');
const { getOneField, getAllFields, addField, removeField, editField } = require("../controllers/fields.js");

const router = Router();

router.use(verifyToken);
router.post('/edit/:fieldId', editField);
router.post('/remove/:fieldId', removeField);
router.post('/add/', addField);
router.get('/get/:fieldId', getOneField);
router.get('/', getAllFields);

module.exports = router;