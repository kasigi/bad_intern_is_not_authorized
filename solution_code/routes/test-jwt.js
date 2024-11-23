const { Router } = require("express");
const {signToken, verifyToken} = require("../controllers/test-jwt.js");

const router = Router();

router.get('/sign-token', signToken);
router.post('/verify-token/', verifyToken);


module.exports = router;