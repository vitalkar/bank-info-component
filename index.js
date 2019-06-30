const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const banks = require('./routes/banks');
const dataStore = require('./data/dataStore');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
//
app.use('/banks', banks);
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

//todo add validation

// todo refactor singletone

//todo write handlers for routes

//todo handle errors module 

//todo add google maps
