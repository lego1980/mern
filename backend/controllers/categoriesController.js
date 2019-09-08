
const mongoose = require("mongoose");
const CategoriesModel = require('../models/CategoriesModel');

//get all pages
exports.pages_get_all = (req, res, next) => { 
    CategoriesModel.find()
    .select('_id title subtitle description keywords content likes images active createdBy createdAt updatedBy updatedAt')
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