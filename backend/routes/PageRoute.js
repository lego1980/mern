
// core
const express = require('express');
const router = express.Router();
const PageController = require('../controllers/PageController');

// this is our get method
// this method fetches all available pages in our database

router.post('/', PageController.pages_add_one);
router.get('/', PageController.pages_get_all);
router.get('/:pageId', PageController.pages_get_one);
router.delete('/:pageId', PageController.pages_delete_one);
router.post('/:pageId', PageController.pages_patch_one);

module.exports = router;