
// core
const express = require('express');
const router = express.Router();

//category routes
const pagesRoute = require('./pagesRoute');
const categoriesRoute = require('./categoriesRoute');
// const categoriesController = require('../controllers/categoriesController');

//router use rules
// cms site
router.use('/cms/pages', pagesRoute);
router.use('/cms/categories', categoriesRoute);

// app site
router.use('/app', categoriesRoute);

module.exports = router;