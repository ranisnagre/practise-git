const express = require('express');
const users = require('./models/users');
const products = require('./models/products');
const results = require('./models/results');
const employees = require('./models/employees');
const finalResults = require('./models/finalResults');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser());


app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/results', results);
app.use('/api/employees', employees);
app.use('/api/finalResults', finalResults);

app.get('/', function (req, res) {
    res.send('This is my landing page without any endpoint');
})

app.listen(5000, () => {
    console.log('example app listning on port 5000')
});

// Tum nahi samjhogi
