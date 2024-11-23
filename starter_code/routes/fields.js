const { Router } = require("express");
const { getOneField, getAllFields, addField, removeField, editField } = require("../controllers/fields.js");

const router = Router();

router.post('/edit/:fieldId', editField);
router.post('/remove/:fieldId', removeField);
router.post('/add/', addField);
router.get('/get/:fieldId', getOneField);
router.get('/', getAllFields);

module.exports = router;