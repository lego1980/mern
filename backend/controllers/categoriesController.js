
const mongoose = require("mongoose");
const CategoriesModel = require('../models/CategoriesModel');

//get all pages

exports.categories = (req, res, next) => { 
    CategoriesModel.find()
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

exports.category_get_all = (req, res, next) => { 
    console.log("categories_get_all",req.params);    
    const category = req.params.category;
    CategoriesModel.find({ category : category })
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

exports.category_get_one_by_id = (req, res, next) => { 
    console.log("categories_get_one",req.params);
    const id = req.params.id;
    const category = req.params.category;

    var valid = mongoose.Types.ObjectId.isValid(id);
    if (valid) {
        CategoriesModel.find({ _id : id, category : category })
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
    } else {
        res.status(200).json({items : [], count: 0});
    }         
}

exports.category_get_one_by_url = (req, res, next) => { 
    console.log("categories_get_one",req.params);
    const url = req.params.url;
    const category = req.params.category;

    CategoriesModel.find({ url : url, category : category })
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