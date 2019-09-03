
// core
const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pagesController');

// this is our get method
// this method fetches all available pages in our database

router.post('/', pagesController.pages_add_one);
router.get('/', pagesController.pages_get_all);
router.get('/:pageId', pagesController.pages_get_one);
router.delete('/:pageId', pagesController.pages_delete_one);
router.post('/:pageId', pagesController.pages_patch_one);

module.exports = router;