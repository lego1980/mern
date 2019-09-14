
const mongoose = require("mongoose");
const ItemModel = require('../models/ItemModel');

//get all items
exports.get_all_items = (req, res, next) => { 
    ItemModel.find()
    .select('_id title subtitle description keywords content likes images active category subCategory tags url createdBy createdAt updatedBy updatedAt')
    .sort('-updatedAt')
    .exec()
    .then(result => {
        const response = {
            count: result.length,
            items: result.map(result => {
                return {
                    _id: result._id,
                    title: result.title,
                    subtitle: result.subtitle,
                    description: result.description,
                    keywords: result.keywords,
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
            })
        };
        res.status(200).json({response});    
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err, items: [], count: 0});
    });  
}


//get all items by category
exports.get_all_items_by_category = (req, res, next) => { 
    console.log("categories_get_all",req.params);    
    const category = req.params.category;
    ItemModel.find({ category : category })
    .select('_id title subtitle description keywords content likes images active category subCategory tags url createdBy createdAt updatedBy updatedAt')
    .sort('-updatedAt')
    .exec()
    .then(result => {
        const response = {
            count: result.length,
            items: result.map(result => {
                return {
                    _id: result._id,
                    title: result.title,
                    subtitle: result.subtitle,
                    description: result.description,
                    keywords: result.keywords,
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
            })
        };
        res.status(200).json({response});    
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err, items: [], count: 0});
    });  
}

//get item by category and url
exports.get_item_by_category_and_url = (req, res, next) => { 
    console.log("categories_get_one",req.params);
    const url = req.params.url;
    const category = req.params.category;

    ItemModel.find({ url : url, category : category })
    .select('_id title subtitle description keywords content likes images active category subCategory tags url createdBy createdAt updatedBy updatedAt')
    .sort('-updatedAt')
    .exec()
    .then(result => {
        const response = {
            count: result.length,
            items: result.map(result => {
                return {
                    _id: result._id,
                    title: result.title,
                    subtitle: result.subtitle,
                    description: result.description,
                    keywords: result.keywords,
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
            })
        };
        res.status(200).json({response});    
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err, items: [], count: 0});
    });      
}