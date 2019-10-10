const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const API_PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

const dbEnv = require('./dbEnv');
// console.log('dbEnv1',dbEnv['API-DEV'].dbRoute);
console.log('process.env.REACT_APP_BOX',process.env.REACT_APP_BOX);
console.log('process.env.REACT_APP_BOX_NAME',process.env.REACT_APP_BOX_NAME);

// if (process.env.REACT_APP_BOX === "API-DEV") {
//     console.log('if API-DEV',process.env.REACT_APP_BOX);
//     console.log('dbRoute',dbEnv[process.env.REACT_APP_BOX].dbRoute);
// } else {
//     console.log('else API-DEV',process.env.REACT_APP_BOX);
// }

// api version 
const apiVersion = 1.0;

// routes
const ApiRoute = require('./routes/ApiRoute');

// this is our MongoDB database
const dbRoute = 'mongodb+srv://rw-beta:1980Dbz4@cluster0-chh6c.mongodb.net/beta_db?retryWrites=true&w=majority';
// connects our back end code with the database
mongoose.connect(dbRoute, { useUnifiedTopology: true, useNewUrlParser: true });
let db = mongoose.connection;
db.once('open', function() { console.log('connected to the database') });
// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// append /api for our http requests
app.use('/api', ApiRoute);

// launch our backend into a port
app.listen(API_PORT, function() { console.log(`LISTENING ON PORT ${API_PORT}`, process.env.PORT) });