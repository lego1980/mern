
// core
const express = require('express');
const router = express.Router();

// cms routes
const CmsCategoryRoute = require('./CmsCategoryRoute');
const CmsItemRoute = require('./CmsItemRoute');

// app routes
const AppRoute = require('./AppRoute');

//router use rules
// cms site
router.use('/cms/items', CmsItemRoute);
router.use('/cms/categories', CmsCategoryRoute);

// app site
router.use('/app', AppRoute);

module.exports = router;