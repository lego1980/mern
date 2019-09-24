
// core
const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

// this is our get method
// this method fetches all available pages in our database

router.get('/listCategories', CategoryController.get_list_of_categories);

router.post('/', CategoryController.add_category);
router.get('/', CategoryController.get_all_categories_pagination);
router.get('/:id', CategoryController.get_category_by_id);
router.delete('/:id', CategoryController.delete_category_by_id);
router.post('/:id', CategoryController.patch_category_by_id);

module.exports = router;