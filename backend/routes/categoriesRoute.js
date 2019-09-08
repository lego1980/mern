
// core
const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

// this is our get method
// this method fetches all available pages in our database

router.get('/', categoriesController.pages_get_all);

module.exports = router;