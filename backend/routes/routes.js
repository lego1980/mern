
// core
const express = require('express');
const router = express.Router();

//category routes
const pagesRoute = require('./pagesRoute');
const categoriesRoute = require('./categoriesRoute');
// const categoriesController = require('../controllers/categoriesController');

//router use rules
router.use('/pages', pagesRoute);
router.use('/', categoriesRoute);

module.exports = router;