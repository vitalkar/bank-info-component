const branches = require('express').Router({mergeParams: true});
const dataStore = require('../lib/dataStore');

// get all branches of the current bank
branches.get('/', (request, response, next) => {
    const bankCode = request.bankCode;
    console.log(`get branches of #${bankCode}`);
});

branches.get('/:branchCode', (request, response, next) => {
    console.log('here')
    const bankCode = request.bankCode;
    const branchCode = request.params.branchCode;

    const data = dataStore.getInfo(bankCode, branchCode);

    console.log(`get branche #${branchCode} of bank #${bankCode}`);
    response.status(200);
    response.json(data);
});

module.exports = branches;