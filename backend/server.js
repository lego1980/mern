const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const API_PORT = 3001;
const app = express();
app.use(cors());

// api version 
const apiVersion = 1.0;

// routes
const versionApiRoute = require('./routes/versionApiRoute');

// this is our MongoDB database
const dbRoute = 'mongodb+srv://rw-beta:1980Dbz4@cluster0-chh6c.mongodb.net/beta_db?retryWrites=true&w=majority';
// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// append /api for our http requests
app.use('/api', versionApiRoute);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));