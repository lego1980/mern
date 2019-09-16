
// core
const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

// this is our get method
// this method fetches all available pages in our database

router.post('/', CategoryController.add_category);
router.get('/', CategoryController.get_all_categories);
router.get('/:id', CategoryController.get_category_by_id);
router.delete('/:id', CategoryController.delete_category_by_id);
router.post('/:id', CategoryController.patch_category_by_id);

module.exports = router;