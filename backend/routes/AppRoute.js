
// core
const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');

//list all active items
router.use('/categories', ItemController.get_all_active_items);

//list all active items by category and url
router.use('/:category/:url', ItemController.get_active_item_by_category_and_url);

//list all active items by category
router.use('/:category', ItemController.get_all_active_items_by_category);

module.exports = router;