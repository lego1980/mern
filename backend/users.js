// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const UsersSchema = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId }, 
    name: String
  },
  { collection: 'users' }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Users', UsersSchema);