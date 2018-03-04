var express = require('express');
var router = express.Router();

const potimon = require('./potimon.js');

router.use('/potimon', potimon);

module.exports = router;