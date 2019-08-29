const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const PagesSchema = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId }, 
    title: String,
    subtitle: String,
    description: String,
    keywords: String,
    content: String,
    likes: Number,
    images: Array
  },
  { collection: 'pages' }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('PagesModel', PagesSchema);