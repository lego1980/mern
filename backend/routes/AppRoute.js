
// core
const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');

//list all items
router.use('/categories', ItemController.get_all_items);

//list all items by category and url
router.use('/:category/:url', ItemController.get_item_by_category_and_url);

//list all items by category
router.use('/:category', ItemController.get_all_items_by_category);

module.exports = router;