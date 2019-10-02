
const mongoose = require("mongoose");
const ItemModel = require('../models/ItemModel');
const sortQuery = require('../utils/sortQuery');
const limitQuery = require('../utils/limitQuery');
const pageQuery = require('../utils/pageQuery');

//get all items count only
exports.get_all_items_count = (req, res, next) => { 
    ItemModel.find()
    .exec()
    .then(result => {
        const response = {
            count: result.length
        };
        res.status(200).json({response});    
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err, count: 0});
    });  
}

//get all items
exports.get_all_items = (req, res, next) => { 
    ItemModel.find()
    .limit(limitQuery(req.query))
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

//get all items with pagination
exports.get_all_items_pagination = (req, res, next) => { 
    let limit = limitQuery(req.query);
    let pageNo = pageQuery(req.query);
    let skip = 0;
    let totalPages = 0;
    ItemModel.find()
    .exec()
    .then(count => {
        //set skip
        skip = limit * (pageNo - 1)
        ItemModel.find()
        .limit(limit)
        .skip(skip)
        .collation({locale: "en" }) // case insensitive sorting
        .sort(sortQuery(req.query))
        .exec()
        .then(result => {
            //set total pages
            totalPages = (result.length !== 0) ? Math.ceil(count.length / limit) : 0;
            const response = {
                limit: limit,
                pageNo: pageNo,
                totalPages: totalPages,
                totalCount: count.length,
                count: result.length,
                items: result
            };
            res.status(200).json({response});    
        }).catch(err => {
            console.log(err)
            res.status(500).json({error: err, items: [], count: 0, totalPages: 0, totalPages: 0, pageNo: pageNo, limit: limit});
        });    
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err, count: 0, totalPages: 0, totalPages: 0, pageNo: pageNo, limit: limit});
    });
}

//get all active items count only
exports.get_all_active_items_count = (req, res, next) => {
    console.log("get_all_active_items_counts",req.query);
    ItemModel.find({ active : true })
    .exec()
    .then(result => {
        const response = {
            count: result.length
        };
        res.status(200).json({response});    
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err, count: 0});
    })
}

//get all active items
exports.get_all_active_items = (req, res, next) => {
    console.log("get_all_active_items",req.query);
    ItemModel.find({ active : true })
    .limit(limitQuery(req.query))
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

//get all active items with pagination
exports.get_all_active_items_pagination = (req, res, next) => { 
    let limit = limitQuery(req.query);
    let pageNo = pageQuery(req.query);
    let skip = 0;
    let totalPages = 0;
    ItemModel.find({ active : true })
    .exec()
    .then(count => {
        //set skip
        skip = limit * (pageNo - 1)
        ItemModel.find({ active : true })
        .limit(limit)
        .skip(skip)
        .collation({locale: "en" }) // case insensitive sorting
        .sort(sortQuery(req.query))
        .exec()
        .then(result => {
            //set total pages
            totalPages = (result.length !== 0) ? Math.ceil(count.length / limit) : 0;
            const response = {
                limit: limit,
                pageNo: pageNo,
                totalPages: totalPages,
                totalCount: count.length,
                count: result.length,
                items: result
            };
            res.status(200).json({response});    
        }).catch(err => {
            console.log(err)
            res.status(500).json({error: err, items: [], count: 0, totalPages: 0, totalPages: 0, pageNo: pageNo, limit: limit});
        });    
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err, count: 0, totalPages: 0, totalPages: 0, pageNo: pageNo, limit: limit});
    });
}

//get all items by category count only
exports.get_all_items_by_category_count = (req, res, next) => {   
    const category = req.params.category;
    ItemModel.find({ category : category })   
    .exec()
    .then(result => {
        const response = {
            count: result.length
        };        
        res.status(200).json({response});    
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err, count: 0});
    });  
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

//get all acitve items by category count only
exports.get_all_active_items_by_category_count = (req, res, next) => {   
    const category = req.params.category;
    ItemModel.find({ active : true, category : category })
    .exec()
    .then(result => {
        const response = {
            count: result.length
        };
        res.status(200).json({response});    
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err, count: 0});
    });  
}

//get all acitve items by category
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

//get all acitve items by category with pagination
exports.get_all_active_items_by_category_pagination = (req, res, next) => { 
    let limit = limitQuery(req.query);
    let pageNo = pageQuery(req.query);
    let skip = 0;
    let totalPages = 0;
    const category = req.params.category;
    ItemModel.find({ active : true, category : category })
    .exec()
    .then(count => {
        //set skip
        skip = limit * (pageNo - 1)
        ItemModel.find({ active : true, category : category })
        .limit(limit)
        .skip(skip)
        .collation({locale: "en" }) // case insensitive sorting
        .sort(sortQuery(req.query))
        .exec()
        .then(result => {
            //set total pages
            totalPages = (result.length !== 0) ? Math.ceil(count.length / limit) : 0;
            const response = {
                limit: limit,
                pageNo: pageNo,
                totalPages: totalPages,
                totalCount: count.length,
                count: result.length,
                items: result
            };
            res.status(200).json({response});    
        }).catch(err => {
            console.log(err)
            res.status(500).json({error: err, items: [], count: 0, totalPages: 0, totalPages: 0, pageNo: pageNo, limit: limit});
        });    
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err, count: 0, totalPages: 0, totalPages: 0, pageNo: pageNo, limit: limit});
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
        dataId: '',
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
                dataId: '',
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
