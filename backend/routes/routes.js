
// core
const express = require('express');
const router = express.Router();

//category routes
const PageRoute = require('./PageRoute');
const ItemRoute = require('./ItemRoute');

//router use rules
// cms site
router.use('/cms/pages', PageRoute);
router.use('/cms/categories', ItemRoute);

// app site
router.use('/app', ItemRoute);

module.exports = router;