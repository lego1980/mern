
// core
const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');
const CategoryController = require('../controllers/CategoryController');

//list categories
router.get('/listCategories', CategoryController.get_list_of_categories);
router.get('/getCategory/:category', CategoryController.get_category_by_category);

//get item counts
router.use('/getItemCount/categories', ItemController.get_all_active_items_count);
router.use('/getItemCount/:category', ItemController.get_all_active_items_by_category_count);

//list all active items with pagination
router.use('/categories', ItemController.get_all_active_items_pagination_with_categories);

//list all active items by category and url
router.use('/:category/:url', ItemController.get_active_item_by_category_and_url);

//list all active items by category with pagination
router.use('/:category', ItemController.get_all_active_items_by_category_pagination);

module.exports = router;