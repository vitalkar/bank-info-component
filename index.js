const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const banks = require('./routes/banks');
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/banks', banks);
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

