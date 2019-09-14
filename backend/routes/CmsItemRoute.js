
// core
const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');

// this is our get method
// this method fetches all available pages in our database

router.post('/', ItemController.add_item);
router.get('/', ItemController.get_all_items);
router.get('/:id', ItemController.get_item_by_id);
router.delete('/:id', ItemController.delete_item_by_id);
router.post('/:id', ItemController.patch_item_by_id);

module.exports = router;