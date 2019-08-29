
const mongoose = require("mongoose");
const PagesModel = require('../models/pagesModel');

exports.pages_get_all = (req, res, next) => { 
    PagesModel.find()
    .select('_id title subtitle description keywords content likes images')
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
                    keywords : result.keywords,
                    content: result.content,
                    likes: result.likes,
                    images: result.images,
                    actions: [
                        {
                            action: "USER_GET_ALL",
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3001/pages/'
                            }
                            
                        },
                        {
                            action: "USER_GET_BY_ID",
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3001/pages/' + result._id
                            }
                        },
                        {
                            action: "USER_POST",
                            request: {
                                type: 'POST',
                                url: 'http://localhost:3001/pages/',
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
                                url: 'http://localhost:3001/pages/' + result._id
                            }
                        },
                        {
                            action: "USER_PATCH",
                            request: {
                                type: 'PATCH',
                                url: 'http://localhost:3001/pages/' + result._id,
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