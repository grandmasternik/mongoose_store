// require and set up dependencies
const express = require("express");
const productsRouter = express.Router(); //an object that provides "router functionality"
const Product = require("../models/products");


// Seed
const productSeed = require('../models/productSeed');

productsRouter.get('/seed', (req, res) => {
    Product.deleteMany({}, (error, allProducts) => {});
    Product.create(productSeed, (error, data) => {
        res.redirect('/products');
    });
});

// Index
productsRouter.get('/', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index', {
            products: allProducts,
        });
    });
});

//New
productsRouter.get('/new', (req, res) => {
    res.render('new.ejs');
    console.log("route visited");
});

//DELETE
productsRouter.delete('/products/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/products');
    });
});

// Update
productsRouter.put('/:id', (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (err, updatedProduct) => {
    res.redirect(`/products/${req.params.id}`)
  });
});

// Create
productsRouter.post(`/`, (req, res) => {
  Product.create(req.body, function (error, createdProduct) {
    res.redirect(`/products`)
  });
});

// Show Page
productsRouter.get(`/:id`, (req, res) => {
  Product.findById(req.params.id, function (error, product) {
    res.render(`show.ejs`, { product })
  })
})

  //EDIT
  productsRouter.get('/products/:id/edit', (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render('edit.ejs', {
            product: foundProduct
        });
    });
});
// export functionality
module.exports = productsRouter;