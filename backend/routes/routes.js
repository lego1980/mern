
// core
const express = require('express');
const router = express.Router();

//category routes
const pagesRoute = require('./pagesRoute');

//router use rules
router.use('/pages', pagesRoute);

module.exports = router;