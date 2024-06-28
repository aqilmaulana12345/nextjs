var express = require('express');
var router = express.Router();
const { callback } = require('./controller')


router.post('/', callback);

module.exports = router;
