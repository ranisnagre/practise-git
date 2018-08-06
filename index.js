const express = require('express');
const users = require('./models/users');
const products = require('./models/products');
const results = require('./models/results');
const employees = require('./models/employees');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser());


app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/results', results);
app.use('/api/employees', employees);

app.get('/', function (req, res) {
    res.send('This is my landing page without any endpoint');
})

app.listen(5000, () => {
    console.log('example app listning on port 5000')
});

// Kuch kuch hota hai
// Tum nahi samjhogi
// Kyuki tumko GIT nahi aata hai
