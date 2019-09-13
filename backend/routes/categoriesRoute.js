
// core
const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

//list all categories
router.use('/categories', categoriesController.categories);

//list pages by categories
router.use('/:category/:url', categoriesController.category_get_one_page);
router.use('/:category', categoriesController.category_get_all_pages);

module.exports = router;