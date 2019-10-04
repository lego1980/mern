const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const CategorySchema = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    dataId: String, 
    title: String,
    subtitle: String,
    description: String,
    keywords: String,
    content: String,
    likes: Number,
    images: Array,
    active: Boolean,
    category: String,
    subCategory: String,
    tags: String,
    url: String,
    updatedAt: Date,
    updatedBy: String,
    createdAt: Date,
    createdBy: String

  },
  { collection: 'categories' }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('CategoriesModel', CategorySchema);