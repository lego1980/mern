
const mongoose = require("mongoose");
const PagesModel = require('../models/pagesModel');

//get all pages
exports.pages_get_all = (req, res, next) => { 
    PagesModel.find()
    .select('_id title subtitle description keywords content likes images createdBy createdAt updatedBy updatedAt')
    .sort('updatedAt')
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
                    createdBy: result.createdBy,
                    createdAt: result.createdAt,
                    updatedBy: result.updatedBy,
                    updatedAt: result.updatedAt,
                    actions: [
                        {
                            action: "USER_GET_ALL",
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3001/api/1.0/pages/'
                            }
                            
                        },
                        {
                            action: "USER_GET_BY_ID",
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3001/api/1.0/pages/' + result._id
                            }
                        },
                        {
                            action: "USER_POST",
                            request: {
                                type: 'POST',
                                url: 'http://localhost:3001/api/1.0/pages/',
                                formdata: {
                                    _id: result._id,
                                    title: result.title,
                                    subtitle: result.subtitle,
                                    description: result.description,
                                    keywords : result.keywords,
                                    content: result.content,
                                    likes: result.likes
                                }
                            }
                        },
                        {
                            action: "USER_DELETE",
                            request: {
                                type: 'DELETE',
                                url: 'http://localhost:3001/api/1.0/pages/' + result._id
                            }
                        },
                        {
                            action: "USER_PATCH",
                            request: {
                                type: 'PATCH',
                                url: 'http://localhost:3001/api/1.0/pages/' + result._id,
                                body: [
                                    { "propName" : "title", "value" : "" },
                                    { "propName" : "subtitle", "value" : "" },
                                    { "propName" : "description", "value" : "" },
                                    { "propName" : "email", "value" : "" },
                                    { "propName" : "keywords", "value" : "" },
                                    { "propName" : "content", "value" : "" },
                                    { "propName" : "likes", "value" : "" }
                                ]
                            }                            
                        }
                    ]
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
    .select('_id title subtitle description keywords content likes images createdBy createdAt updatedAt')
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
                createdBy: result.createdBy,
                createdAt: result.createdAt,
                updatedBy: result.updatedBy,
                updatedAt: result.updatedAt,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3001/api/1.0/pages/' + result._id
                }
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
                createdBy: result.createdBy,
                createdAt: result.createdAt,
                updatedBy: result.updatedBy,
                updatedAt: result.updatedAt,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3001/api/1.0/pages/' + result._id
                }
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
            message: 'Page deleted',
            request: {
                type: 'GET',
                url: 'http://localhost:3001/api/1.0/pages/'
            }
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
            message: 'Page updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/api/1.0/pages/' + id
            }
        })        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err}); 
    });
}