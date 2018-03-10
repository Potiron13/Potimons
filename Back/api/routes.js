var express = require('express');
var router = express.Router();

const potimon = require('./potimon.js');
const saveAndLoad = require('./saveAndLoad.js');
const users = require('./users.js');

router.use('/potimon', potimon);
router.use('/saveAndLoad', saveAndLoad);
router.use('/users', users);

module.exports = router;