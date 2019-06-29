const banks = require('express').Router();
const branches = require('./branches');
const dataStore = require('../lib/dataStore');

banks.get('/', (request, response) => {
    console.log('inside GET /banks');
    const banks = dataStore.getBanks();
    if (banks) {
        response.status(200);
        response.json(banks);
    } else {
        response.status(500);
        response.json({});
        
    }
})

banks.get('/:bankCode', (request, response) => {
    const bankCode = request.params.bankCode,
          branches = dataStore.getBranches(bankCode);
    response.json(branches);
})

banks.use('/:bankCode/branches', (request, response, next) => {
    request.bankCode = request.params.bankCode;
    next()
}, branches);

module.exports = banks;