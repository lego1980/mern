
// core
const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

router.use('/categories', categoriesController.categories);
router.use('/:category/:url', categoriesController.category_get_one_by_url);
router.use('/:category', categoriesController.category_get_all);

module.exports = router;