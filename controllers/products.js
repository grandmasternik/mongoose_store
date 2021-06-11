// require and set up dependencies
const express = require("express");
const productsRouter = express.Router(); //an object that provides "router functionality"

const Product = require("../models/products");

// Index
productsRouter.get('/', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        });
    });
});

// Seed
const productSeed = require('../models/productSeed');
productsRouter.get('/products/seed', (req, res) => {
    Product.deleteMany({}, (error, allProducts) => {});

    Product.create(productSeed, (error, data) => {
        res.redirect('/products');
    });
});

//New
productsRouter.get('/products/new', (req, res) => {
    res.render('new.ejs');
});

//DELETE
productsRouter.delete('/products/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/products');
    });
});

// Update
productsRouter.put('/products/:id', (req, res) => {
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    res.send(req.body);
});

//Create 
productsRouter.post('/products', (req, res) => {
    if (req.body.completed === 'on') {
        //if checked, req.body.completed is set to 'on'
        req.body.completed = true;
    } else {
        //if not checked, req.body.completed is undefined
        req.body.completed = false;
    }
    Product.create(req.body, (error, createdProduct) => {
        res.redirect('/products');
    });
});

//EDIT
productsRouter.get('/products/:id/edit', (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render('edit.ejs', {
            product: foundProduct
        });
    });
});

// Show Page
productsRouter.get('/products/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct
        });
    });
});


// export functionality
module.exports = productsRouter;