const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res) => {
    console.log('Hello from add product');
    
    res.render('add-product', {pageTitle: 'AddProducts'})
});

router.post('/add-product', (req, res) => {
    products.push({title: req.body.title});
    res.redirect('/');
});

exports.routes = router;
exports.products = products;