
// core
const express = require('express');
const router = express.Router();

//category routes
const routes = require('./routes');
const version = "1.0";

//router use rules
router.use('/'+version, routes);

module.exports = router;