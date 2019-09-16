
const mongoose = require("mongoose");
const CategoryModel = require('../models/CategoryModel');

//get all categories
exports.get_all_categories = (req, res, next) => { 
    CategoryModel.find()
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

//get all active categories
exports.get_all_active_categories = (req, res, next) => { 
    CategoryModel.find({ active : true })
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

//get all category by category
exports.get_all_category_by_category = (req, res, next) => {   
    const category = req.params.category;
    CategoryModel.find({ category : category })
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

//get all active category by category
exports.get_all_active_category_by_category = (req, res, next) => {   
    const category = req.params.category;
    CategoryModel.find({ active : true, category : category })
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

//add category
exports.add_category = (req, res, next) => { 
    const Category = new CategoryModel({
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
    Category.save().then(result => {
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

//get category by id
exports.get_category_by_id = (req, res, next) => { 
    const id = req.params.id;
    CategoryModel.findById(id)
    .select('_id title subtitle description keywords content likes images active category subCategory tags url createdBy createdAt updatedAt')
    .exec()
    .then(result => {     
        if (result) {
            const response = {
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
            };
            res.status(200).json({response});
        } else {
            res.status(404).json({message: "No valid entry"});
        }        
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err});
    });      
}

//delete category by id
exports.delete_category_by_id = (req, res, next) => { 
    const id = req.params.id;
    CategoryModel.deleteOne({_id:id}).exec(        
    ).then(result => {
        res.status(200).json({
            message: 'Page deleted'
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

//update category by id
exports.patch_category_by_id  = (req, res, next) => { 
    const id = req.params.id;
    const updateOps = {};
    for (const [key, value] of Object.entries(req.body)) {
        updateOps[key] = value;
    }
    CategoryModel.update(
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