
const mongoose = require("mongoose");
const ItemModel = require('../models/ItemModel');
const sortQuery = require('../utils/sortQuery');

//get all items
exports.get_all_items = (req, res, next) => { 
    ItemModel.find()
    .collation({locale: "en" }) // case insensitive sorting
    .sort(sortQuery(req.query))
    .exec()
    .then(result => {
        const response = {
            count: result.length,
            items: result
        };
        res.status(200).json({response});    
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err, items: [], count: 0});
    });  
}

//get all active items
exports.get_all_active_items = (req, res, next) => {
    ItemModel.find({ active : true })
    .collation({locale: "en" }) // case insensitive sorting
    .sort(sortQuery(req.query))
    .exec()
    .then(result => {
        const response = {
            count: result.length,
            items: result
        };
        res.status(200).json({response});    
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err, items: [], count: 0});
    })
}

//get all items by category
exports.get_all_items_by_category = (req, res, next) => {   
    const category = req.params.category;
    ItemModel.find({ category : category })
    .collation({locale: "en" }) // case insensitive sorting
    .sort(sortQuery(req.query))
    .exec()
    .then(result => {
        const response = {
            count: result.length,
            items: result
        };        
        res.status(200).json({response});    
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err, items: [], count: 0});
    });  
}

//get all atcitve items by category
exports.get_all_active_items_by_category = (req, res, next) => {   
    const category = req.params.category;
    ItemModel.find({ active : true, category : category })
    .collation({locale: "en" }) // case insensitive sorting
    .sort(sortQuery(req.query))
    .exec()
    .then(result => {
        const response = {
            count: result.length,
            items: result
        };
        res.status(200).json({response});    
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err, items: [], count: 0});
    });  
}

//get item by category and url
exports.get_item_by_category_and_url = (req, res, next) => { 
    const url = req.params.url;
    const category = req.params.category;
    ItemModel.find({ url : url, category : category })
    .collation({locale: "en" }) // case insensitive sorting
    .sort(sortQuery(req.query))
    .exec()
    .then(result => {
        const response = {
            count: result.length,
            items: result
        };
        res.status(200).json({response});    
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err, items: [], count: 0});
    });      
}

//get active item by category and url
exports.get_active_item_by_category_and_url = (req, res, next) => { 
    const url = req.params.url;
    const category = req.params.category;
    ItemModel.find({ active : true, url : url, category : category })
    .collation({locale: "en" }) // case insensitive sorting
    .sort(sortQuery(req.query))
    .exec()
    .then(result => {
        const response = {
            count: result.length,
            items: result
        };
        res.status(200).json({response});    
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err, items: [], count: 0});
    });      
}

//add item
exports.add_item = (req, res, next) => { 
    const Item = new ItemModel({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        keywords : req.body.keywords,
        content: req.body.content,
        likes: 0,
        images: [],
        active: req.body.active,
        category: req.body.category,
        subCategory: req.body.subCategory,
        tags: req.body.tags,
        url: req.body.url,
        createdBy: req.body.createdBy,
        createdAt: req.body.createdAt,
        updatedBy: req.body.updatedBy,
        updatedAt: req.body.updatedAt,
    });
    Item.save().then(result => {
        res.status(201).json({
            message: 'Created page successfully',
            createdPage: {
                _id: result._id,
                title: result.title,
                subtitle: result.subtitle,
                description: result.description,
                keywords : result.keywords,
                content: result.content,
                likes: result.likes,
                images: result.images,
                active: result.active,
                category: result.category,
                subCategory: result.subCategory,
                tags: result.tags,
                url: result.url,
                createdBy: result.createdBy,
                createdAt: result.createdAt,
                updatedBy: result.updatedBy,
                updatedAt: result.updatedAt
            }
        });
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err});
    });    
}

//get item by id
exports.get_item_by_id = (req, res, next) => { 
    const id = req.params.id;
    ItemModel.findById(id)
    .exec()
    .then(result => {     
        if (result) {
            res.status(200).json({result});
        } else {
            res.status(404).json({message: "No valid entry"});
        }        
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err});
    });      
}

//delete item by id
exports.delete_item_by_id = (req, res, next) => { 
    const id = req.params.id;
    ItemModel.deleteOne({_id:id}).exec(        
    ).then(result => {
        res.status(200).json({
            message: 'Page deleted'
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

//update item by id
exports.patch_item_by_id  = (req, res, next) => { 
    const id = req.params.id;
    const updateOps = {};
    for (const [key, value] of Object.entries(req.body)) {
        updateOps[key] = value;
    }
    ItemModel.update(
        {_id:id}, 
        { $set: updateOps}
    )
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Page updated'
        })        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err}); 
    });
}
