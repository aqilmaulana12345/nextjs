var express = require('express');
var router = express.Router();
const { generateProduct, generateItem } = require('./controller')

// const { isLoginAdmin } = require('../middleware/auth')

// router.use(isLoginAdmin)

//router.get('/helper/generate/products', generateProduct);
//router.get('/helper/generate/items/:id/create', generateItem);
module.exports = router;
