const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

// const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/add-product', (req, res) => {
    console.log('Hello from add product');
    
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>')
});

app.post('/product', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req, res, next) => {
    console.log('In another middlewares!');  
    res.send('<h1>Hello from Express!</h1>')  
});

app.listen(3000);