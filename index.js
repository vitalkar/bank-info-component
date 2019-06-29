const express = require('express');
const app = express();
//3rd party libs

const bodyParser = require('body-parser');
//
const banks = require('./routes/banks');
const dataStore = require('./lib/dataStore');

// dataStore.getInfo();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//todo move to routes/index
app.use('/banks', banks);
app.listen(3000, () => {
    
    console.log("Server running on port 3000");

});

//todo add spinner

//todo add validation

//todo fetch data, parse & save it

// todo use singletone

//todo write handlers for routes

//todo write helper function for xml
//todo use tests
//todo handle errors module 
//todo include git ignore

//todo remember how i did it with the function handlers in the bootcamp