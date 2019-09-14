
// core
const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

//list all categories
router.use('/categories', CategoryController.categories);

//list pages by categories
router.use('/:category/:url', CategoryController.category_get_one_page);
router.use('/:category', CategoryController.category_get_all_pages);

module.exports = router;