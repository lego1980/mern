
// core
const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pagesController');

// this is our get method
// this method fetches all available pages in our database
router.get('/pages', pagesController.pages_get_all);
// router.get('/getPages', (req, res) => {
//     Pages.find((err, data) => {
//       if (err) return res.json({ success: false, error: err });
//       return res.json({ success: true, data: data });
//     });
// });
  
// this is our update method
// this method overwrites existing data in our database
router.post('/updatePages', (req, res) => {
    const { _id, update } = req.body;
    Pages.findByIdAndUpdate(_id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});
  
// this is our delete method
// this method removes existing data in our database
router.delete('/deletePage', (req, res) => {
    const { _id } = req.body;
    Pages.findByIdAndRemove(_id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});
  
// this is our create methid
// this method adds new data in our database
router.post('/putPage', (req, res) => {
    let data = new Pages();

    const { name } = req.body;

    if (!name) {
        return res.json({
        success: false,
        error: 'INVALID INPUTS',
        });
    }
    data.name = name;
    data._id = new mongoose.Types.ObjectId()
    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});


module.exports = router;