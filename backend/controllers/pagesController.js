
const mongoose = require("mongoose");
const PagesModel = require('../models/pagesModel');

//get all pages
exports.pages_get_all = (req, res, next) => { 
    PagesModel.find()
    .select('_id title subtitle description keywords content likes images active category subCategory tags url createdBy createdAt updatedBy updatedAt')
    .sort('-updatedAt')
    .exec()
    .then(result => {
        const response = {
            count: result.length,
            pages: result.map(result => {
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
        res.status(500).json({error: err});
    });  
}

exports.pages_get_one = (req, res, next) => { 
    const id = req.params.pageId;
    PagesModel.findById(id)
    .select('_id title subtitle description keywords content likes images category subCategory tags createdBy createdAt updatedAt')
    .exec()
    .then(result => {     
        if (result) {
            const response = {
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

//add page
exports.pages_add_one = (req, res, next) => { 
    const Page = new PagesModel({
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
    Page.save().then(result => {
        console.log(result);
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

//delete page
exports.pages_delete_one = (req, res, next) => { 
    const id = req.params.pageId;
    PagesModel.deleteOne({_id:id}).exec(        
    ).then(result => {
        res.status(200).json({
            message: 'Page deleted'
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

//https://stackoverflow.com/questions/52166826/req-body-is-not-iterable-in-node-js
exports.pages_patch_one = (req, res, next) => { 
    const id = req.params.pageId;
    const updateOps = {};
    console.log("req",req.body);
    for (const [key, value] of Object.entries(req.body)) {
        updateOps[key] = value;
    }
    PagesModel.update(
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