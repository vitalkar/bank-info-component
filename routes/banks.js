const banks = require('express').Router();
const branches = require('./branches');
const dataStore = require('../data/dataStore');

banks.get('/:bank', (request, response) => {
    const { bank } = request.params;
    if (!bank) {
        return;
    } else {        
        const banks = dataStore.getBanks(bank);
        response.json(banks);
    }
});

banks.use('/:bank/branches', (request, response, next) => {
    // request.bankCode = request.params.bank;
    request.bank = request.params.bank;
    next();
}, branches);

module.exports = banks;