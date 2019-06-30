const branches = require('express').Router({mergeParams: true});
const dataStore = require('../data/dataStore');

branches.get('/', (request, response) => {
    const { bank }  = request;
    const data = dataStore.getBranches(bank);
    response.json(data);
});

branches.get('/:branch', (request, response) => {
    const { bank } = request;
    const { branch } = request.params;
    
    const data = dataStore.getInfo(bank, branch);
    // response.status(200);
    response.json(data);
});

module.exports = branches;